
const RESPONSE_CODE = {
    OK: {status: "success", code: 200},
    BadRequest: { status: "error", code: 400}
}
class Custom_Response {
     message;
     data;
     status;

     constructor(message, responseCode, data){
         this.message = message;
         this.data = data
         this.status = responseCode.status
     }

     getResponse() {
        return {
            message: this.message,
            status: this.status,
            data: this.data
        }
     }

}

module.exports = {
    RESPONSE_CODE,
    Custom_Response
}