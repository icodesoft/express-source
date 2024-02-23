const Layer = require('./layer');
const url = require('url');

function Route() {
    this._stack = [];
}
Route.prototype.get = function(handlers) {
    handlers.forEach(handler => {
        let layer = new Layer('', handler);
        layer.method = 'GET';
        this._stack.push(layer);
    });
}

Route.prototype.dispatch = function(req, res, out) {
    let index = 0;
    let next = ()=>{
        if (index >= this._stack.length) {
            return out(req, res);
        }
        let layer = this._stack[index++];
        if (layer.method === req.method) {
        console.log(layer);

            layer.handler_request(req, res, next);
        } else {
            next();
        }
    }
    next();
}

module.exports = Route;