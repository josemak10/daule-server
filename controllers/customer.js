var http = require('http');

const getCustomer = async (customer) => {
    var data = JSON.stringify({
        'id': '2'
    });
    var options = {
        host: process.env.SIIM_HOST,
        port: process.env.SIIM_PORT,
        path: process.env.SIIM_PATH_CUSTOMER + 'clientes/get/' + customer.identifier,
        // path: '/SIIM/rest/clientes/get/0601495401',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        }
    };
    console.log(options)
    var req = http.request(options, function(res) {
        var msg = '';
        
        res.setEncoding('utf8');
        res.on('data', function(chunk) {
            msg += chunk;
        });
        res.on('end', function() {
            return JSON.parse(msg);
        });
    });
    
    req.write(data);
    req.end();
}

module.exports = {
    getCustomer,
}