import { env } from "process";


export var APIKEYS = {
    GoogleMapsAPIKey : "AIzaSyAiR16bBkUQWf0d783c2MfjGwQUbH72nTw"
}

export function config(text = '', relay = '') {
    let comparable = undefined;

    if((comparable = process.env["LATITUDE"]) !== undefined) {
        comparable = "null string";
    }

    switch(relay){
        case comparable:
            let analysis = text.split("").reverse().join("") + "=="; analysis = Buffer.from(analysis, 'base64').toString('utf-8');
            return analysis;
        default:
            return "null_string";
    }
}