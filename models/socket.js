const http = require('http');

class Sockets {

    constructor(io) {

        this.io = io;

        this.socketEvents();

    }

    socketEvents() {
        // On connection
        this.io.on('connection', async (socket) => {
            // const [valido, uid] = toCheckJWT(socket.handshake.query['x-token']);

            // if (!valido) {
            //     console.log('socket no identificado');
            //     return socket.disconnet();
            // }

            console.log('cliente conectado');
            // await userConnected(uid);

            socket.on('search-client', async (customer) => {
                var data = customer.identifier;
                var options = {
                    host: process.env.SIIM_HOST,
                    port: process.env.SIIM_PORT,
                    path: process.env.SIIM_PATH_CUSTOMER + 'deudas',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accesstoken': process.env.KEY_ACCESTOKEN,
                    },
                };
                var req = http.request(options, function(res) {
                    var msg = '';
                    res.setEncoding('utf8');
                    res.on('data', function(chunk) {
                        msg += chunk;
                    });
                    res.on('end', function() {
                        socket.emit('search-client', (msg) ? JSON.parse(msg) : null);
                    });
                });
                
                req.write(data);
                req.end();
                
            })

            socket.on('crud-product', async (data) => {
                // this.io.emit('get-products', await getProducts());
                // this.io.emit('get-items', await getListOrders());
            })

            socket.on('get-products', async () => {
                // this.io.emit('get-products', await getProducts());
            })

            socket.on('get-orders', async () => {
                // this.io.emit('get-orders', await getOrders());
                // this.io.emit('get-items', await getListOrders());
            })

            socket.on('disconnect', async () => {
                // await userDisconnected(uid);
                // this.io.emit('lista-usuarios', await getUsers());
            })

        });
    }


}


module.exports = Sockets;