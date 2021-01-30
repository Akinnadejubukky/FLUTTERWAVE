const { compareFields } = require('../utils/validation')
const { RESPONSE_CODE, Custom_Response} = require('../utils/custom-response');

exports.GetMyProfile = async (request, response) => {
 try { 
    const message = 'My Rule-Validation API';
    const data = {
        name: "Bukola Felicia Akinnadeju",
        github: "@Akinnadejubukky",
        email: "bukky.akinnadeju17@gmail.com",
        mobile: "08130620238",
        twitter: "@Akinnadejubukky"
      };
      const result = new Custom_Response(message, RESPONSE_CODE.OK, data);

      return response.status(200).json(result.getResponse())
    } catch(error) {
    const resultResponse = new  Custom_Response("Something went wrong","Server failure", null);

    return response.status(500).json(resultResponse.getResponse());
    }
}

exports.ValidateController = async (request, response) => {
    try { 
        const { error }= request;

        if(error) {
            const key = error.details[0].context.key;
            let rawMessage = error.details[0].message;
            let message = rawMessage.split(" ");
            message[0] = [key];
            const refinedMessage = message.join(" ")
            const resultResponse =  new Custom_Response(refinedMessage, RESPONSE_CODE.BadRequest, null);

            return response.status(200).json(resultResponse.getResponse());
        }

        const { rule, data } = request.body;
        const { result, refinedData } = compareFields(rule, data);
        const resultResponse = new  Custom_Response(result.message, result.status, refinedData);
   
         return response.status(200).json(resultResponse.getResponse())
       } catch(error) {
        const resultResponse = new  Custom_Response("Something went wrong","Server failure", null);

        return response.status(500).json(resultResponse.getResponse());
       }
   }