const url = require('url');
const Route = require('./Route');
const Layer = require('./layer');

function Router() {
    this._stack = [];
}

Router.prototype.get = function(path, handlers) {
    let route = new Route();
    let layer = new Layer(path, route.dispatch.bind(route));
    layer.route = route;
    this._stack.push(layer);
    route.get(handlers);
}

Router.prototype.handler = function(req, res, out) {
    let {pathname} = url.parse(req.url);
    let index = 0;
    let next = ()=> {
        if (index >= this._stack.length) {
           return out(req, res);
        }
        const layer = this._stack[index++];
        if (layer.match(pathname)) {
            layer.handler_request(req, res, next); // next为外层下一个函数
        } else {
            next();
        }
    }
    next();
}

module.exports = Router;