import uuidv4 from 'uuid'


const API_URL = "http://127.0.0.1:3030/api";

export function createRequest(method, params, id=null) {

    if (!id) {
        id = uuidv4();
    }

    let message = {
        "jsonrpc": "2.0",
        "method": method,
        "params": params,
        "id": id
    };

    return message;
}

export function getContacts(name=null, comment=null) {
    if (!comment) comment = "";
    if (!name) return {};

    const request = createRequest("search", {"name":name, "comment": comment});
    console.log(request);
}
