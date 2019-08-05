const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = res.method;

    // If the request URL is / will load the Form
    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>Enter a Message</title><head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">SEND<button/></form><body>');
        res.write('</html>');
        return res.end();
    }
    
    // If the request URL is /message and method = POST
    // split the request in chuncks and save the message in a file
    if (url === '/message' && method === 'POST') {
        const body = [];
    
        req.on('data', chunk => {
            console.log(chunk);
            body.push(chunk);
        });
    
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            console.log(message);
            fs.writeFile('message.txt', message, (err) => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        });
    }
    
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My First Page</title><head>');
    res.write('<body><h1>Hello from Node.js</h1><body>');
    res.write('</html>');
    res.end();
};

module.exports = requestHandler;