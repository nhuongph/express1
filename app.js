var express = require('express');
var app = express();

var db = require('./models');
var DistrictController = require('./controllers/DistrictController');

app.get('/index', DistrictController.index);
app.post('/uploads', DistrictController.uploads);

app.listen(8888, function() {
  db.sequelize.sync();
});