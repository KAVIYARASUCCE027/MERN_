const http = require('http'); // Module to create HTTP server
const modules = require('./modules'); 

const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" }); 
    
    res.write(`Calculator <br> `); 
    res.write(`addition of 10 and 7 = ${modules.add(10, 7)}<br>`); 
    res.write(`subtraction of 10 and 7 =${modules.sub(10, 7)}<br>`); 
    res.write(`multiplication of 10 and 7 = ${modules.multi(10, 7)}<br>`); 
    res.write(`division of 10 and 7 = ${modules.div(10, 7)}<br>`); 

    res.end(); 
});

server.listen(3000, () => {
    console.log("Server is running on port 3000");
});


