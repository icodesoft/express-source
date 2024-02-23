function Layer(path, handler) {
    this._path = path;
    this._handler = handler;
}
Layer.prototype.match = function(path) {
    return path === this._path;
}
Layer.prototype.handler_request = function(req, res, out) {
    return this._handler(req, res, out);
}

module.exports = Layer;