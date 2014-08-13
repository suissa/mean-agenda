var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AgendaSchema = new Schema({
  name: { type: String, default: '' },
  facebook: { type: String, default: '' },
  email: { type: String, default: ''},
  subject: { type: String, default: ''},
  city: { type: String, default: ''},
  state: { type: String, default: ''},
  tags: [{ type: String, default: '' }] 
});

module.exports = mongoose.model('Agenda', AgendaSchema);


