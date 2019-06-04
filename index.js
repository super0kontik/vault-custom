const rp = require('request-promise');
let client = {};
client.apiVersion =  'v1';
client.endpoint =  'http://127.0.0.1:8200';
client.pathPrefix =  '';
client.token =  '111';
client.noCustomHTTPVerbs =  false;

let options={
         headers:{
             'X-Vault-Token': client.token
         },
        json:true
    };

const makeRequest = opts =>{
    return rp(opts).then(res=>{
        console.log(res);
        options={
            headers:{
                'X-Vault-Token': client.token
            },
            json:true
        };
        return res;
    })
        .catch(err=>{
            options={
                headers:{
                    'X-Vault-Token': client.token
                },
                json:true
            };
            console.log(err.error.errors);
            return err.error.errors;
        })
};

module.exports.write = (path,data) =>{
    options.uri = `${client.endpoint}/${client.apiVersion}${client.pathPrefix}/secret/data/${path}`;
    options.method = 'POST';
    options.headers['Content-Type']='application/json';
    options.body = data;
    return makeRequest(options);
};

module.exports.read =  path => {
    options.uri = `${client.endpoint}/${client.apiVersion}${client.pathPrefix}/secret/data/${path}`;
    options.method = 'GET';
    return makeRequest(options);
};

module.exports.delete = path =>{
    options.uri = `${client.endpoint}/${client.apiVersion}${client.pathPrefix}/secret/data/${path}`;
    options.method = 'DELETE';
    return makeRequest(options);
};