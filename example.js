const secret = require('./index');

secret.write('hello',{"data":{"hello":"world"}}).then(res=>{
    console.log('write method returned : ',res);
});

secret.read('hello').then(res=>{
    console.log('readed, data : ',res.data.data);
});

secret.delete('hello').then(res=>{
    console.log('deleted');
});