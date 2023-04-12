var http = require('http');
var uc = require('upper-case');
var fs = require('fs');

http.createServer(function (req, res) {
    fs.readFile('mydata.json', function (err, data) {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.write(data);
        return res.end();
    });
}).listen(8000); // 8000 || 8100 || 3000 || 3030