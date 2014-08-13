var Agenda = require('./model');
var msg = '';

module.exports = {
  renderList: function(req, res, cb){
    var msg = 'Listagem completa';
    var view = 'agenda/list';
    var query = {};
    Agenda.find(query, function (err, data) {
      cb(err, data, res, view, msg);
    });
  },
  renderCreate: function(req, res, cb){
    var msg = 'Cadastro de cerveja';
    var view = 'agenda/create';
    cb(null, null, res, view, msg);
  },
  renderShow: function(req, res, cb){
    var msg = 'Consulta completa';
    var view = 'agenda/show';
    var id = req.params.id;
    var query = {_id: id};
    Agenda.findOne(query, function (err, data) {
      cb(err, data, res, view, msg);
    });
  },
  renderEdit: function(req, res, cb){
    var msg = 'Alteração de cerveja';
    var view = 'agenda/edit';
    var id = req.params.id;
    var query = {_id: id};
    Agenda.findOne(query, function (err, data) {
      cb(err, data, res, view, msg);
    });
  },
  renderRemove: function(req, res, cb){
    var msg = 'Remoção de cerveja';
    var view = 'agenda/remove';
    var id = req.params.id;
    var query = {_id: id};
    Agenda.findOne(query, function (err, data) {
      cb(err, data, res, view, msg);
    });
  }
};








