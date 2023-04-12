//
var http = require('http');
var fs = require('fs');
//create a new folder 
var dir = './Lab3/json';
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}
http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    fs.writeFile(`${dir}/demo_1.json`, `{
        "albumId": 1,
        "id": 1,
        "title": "accusamus beatae ad facilis cum similique qui sunt",
        "url": "https://via.placeholder.com/600/92c952",
        "thumbnailUrl": "https://via.placeholder.com/150/92c952"
      }`, function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
    res.write("Dang luu file ")
    res.end();
}).listen(3000);