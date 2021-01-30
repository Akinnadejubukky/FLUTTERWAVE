const Joi = require('joi');
const {RESPONSE_CODE} = require('../utils/custom-response')

const schema = Joi.object({
    rule:  Joi.object({
            field: Joi.string().required(),
            condition: Joi.string().required(),
            condition_value: Joi.required(),         
             }).required(),

    data: Joi.alternatives().try(Joi.array(), Joi.string(), Joi.object()).required()
});

const compareFields = (rule, data)  => { 
    const conditionValue = rule['condition_value'];
    const fieldName = rule['field'];
    const fieldValue = data[fieldName];
    const condition = rule['condition'];
    const result = {};
    let checkValue

    if(!fieldValue) {
        result.message = `field ${fieldName} is missing from data.`;
        result.status = RESPONSE_CODE.BadRequest;
        result.error = true;


        return  { result, refinedData: null }
    }

    switch(condition ) {
        case 'eq':
            checkValue = fieldValue === conditionValue;
            setResult(checkValue,fieldName, result)
            break;
        case 'neq':
            checkValue = fieldValue !== conditionValue;
            setResult(checkValue,fieldName, result)
            break;
        case 'gt':
            checkValue = fieldValue > conditionValue;
            setResult(checkValue,fieldName, result)
            break;
        case 'gte':
            checkValue = fieldValue  >= conditionValue;
            setResult(checkValue,fieldName, result)
            break;
        case 'contains':
            checkValue = fieldValue.includes(conditionValue);
            setResult(checkValue,fieldName, result)
            break;
        default:
            break;
    }

    const refinedData = buildData(result, conditionValue, fieldName, fieldValue, condition)

    return { result, refinedData }
}

const setResult =  (checkValue,fieldName, result) => {
    if(checkValue){
        result.error  = false;
        result.status = RESPONSE_CODE.OK
        result.message = `field ${fieldName} successfully validated.`
    } else{
        result.error  = true;
        result.status = RESPONSE_CODE.BadRequest
        result.message = `field ${fieldName} failed validation.`
    }
};

const buildData = (result, conditionValue, fieldName, fieldValue, condition) => {
return {
    validation: {
      error: result.error,
      field: fieldName,
      field_value: fieldValue,
      condition: condition,
      condition_value: conditionValue
    }
  }
}

module.exports ={
    schema, 
    compareFields,
}