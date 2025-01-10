const http = require('http');
const fs = require('fs');  

const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "application/json" });

    fs.readFile('./sample.json', 'utf8', (err, data) => {
        if (err) {
            console.log("error not able to open the file")
            return;
        }
        
        try {
            const jsonData = JSON.parse(data);  
            const filteredData = jsonData.filter(person => person.amount > 2000);
            res.write(JSON.stringify(filteredData));
            res.write(JSON.stringify(jsonData, null, 2));  
        } catch (parseError) {
            res.write(JSON.stringify({ error: "Error parsing JSON" }));
        }
        
        res.end();
    });
});

server.listen(3000, () => {
    console.log("Server is running on port 3000");
});
