const express = require('./lib/express');

const app = express();

app.get('/hello', (req, res)=> {
    res.end('Hello World');
})
app.listen(3000, ()=> {
    console.info('This server address: http://localhost:3000')
});
