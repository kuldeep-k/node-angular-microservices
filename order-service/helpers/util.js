class Util {
    extractTokenFromRequest(req) {
        if(req.headers.authorization) {
            console.log("Util authorizationtoken ", req.headers.authorization);
            let temp = req.headers.authorization.split("Bearer ");
            console.log("Util temp ", temp);
            return temp[1];
        }
    }        
}

module.exports = new Util;