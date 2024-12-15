const http = require('http');

const requestListener = (request, response) => {
    // response.setHeader('Content-Type', 'text/html');
    // response.statusCode = 200;
    response.setHeader('Content-Type', 'application/json');
    response.setHeader('Powered-By', 'Node.js');


    const { method, url } = request;

    if (url === '/') {

        if (method === 'GET') {
            response.statusCode = 200;
            // response.end('<h1>Ini adalah homepage</h1>');
            response.end(JSON.stringify({
                message: "Ini adalah homepage",
            }));
        } else {
            response.statusCode = 400;
            // response.end(`<h1>Halaman ini tidak dapat diakses dengan ${method} request`);
            response.end(JSON.stringify({
                message: `Halaman ini tidak dapat diakses dengan ${method} request`,
            }));
        }


        

    
        // if (method === 'PUT') {
        //     response.end('<h1>Put Hello World</h1>');
        // }

    
        // if (method === 'DELETE') {
        //     response.end('<h1>Delete Hello World</h1>');
        // }
    
    } else if (url === '/about') {

        if (method === 'GET') {
            response.statusCode = 200;
            // response.end(`<h1>Hai, ini adalah halaman about</h1>`);
            response.end(JSON.stringify({
                message: "Hai, ini adalah halaman about",
            }));

        } else if (method === 'POST') {
            let body = [];
    
            request.on('data', (chunk) => {
                body.push(chunk);
            });
    
            request.on('end', () => {

                body = Buffer.concat(body).toString();
                const { name } = JSON.parse(body);

                response.statusCode = 200;
                // response.end(`<h1>Hai ${name}, ini adalah halaman about</h1>`);
                response.end(JSON.stringify({
                    message: `Hai ${name}, ini adalah halaman about`,
                }));
            });
        } else {
            response.statusCode = 400;
            // response.end(`Halaman tidak menerima ${method} request`);
            response.end(JSON.stringify({
                message: `Halaman ini tidak dapat diakses dengan ${method} request`,
            }));
        }

    } else {
        response.statusCode = 404;
        // response.end('<h1>Halaman tidak ditemukan</h1>');
        response.end(JSON.stringify({
            message: `Halaman tidak ditemukan`,
        }));
    }

    
   


}

const server = http.createServer(requestListener);

const port = 5000;
const hostName = 'localhost';

server.listen(port, hostName, () => {
    console.log(`Server berjalan pada http://${hostName}:${port}`)
})