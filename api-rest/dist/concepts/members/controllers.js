'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.get = get;
function get(req, res) {
    var members = [{ name: 'Rosa', surname: 'Mateo', email: 'rosamateo@emial.com' }, { name: 'Jose', surname: 'Mateo', email: 'josemateo@gmail.com' }];

    res.status(200).json(members);
}