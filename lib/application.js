const http = require('http');
const Router = require('./router');

function Application() {
    this._router = new Router();
}

Application.prototype.get = function(path, ...handlers) {
    this._router.get(path, handlers);
}

Application.prototype.listen = function() {
    const server = http.createServer((req, res) => {
        let done = (req, res) => {
            res.end(`NOT_FOUND ${req.url} ${req.method}`);
        }
        console.log('666666: ' + req.url);
        this._router.handler(req, res, done);
    });
    server.listen(...arguments);
}
module.exports = Application;