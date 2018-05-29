var db = require('../models');
var Districts = db.Districts;

var formidable = require('formidable');

const XLSX = require('xlsx');
const FS = require('fs');
const PATH = 'public/uploads/';

var uploads = (request, response) => {
  let form =  new formidable.IncomingForm();
  let fileName = '';
  form.parse(request,function (err, fields, file) {
    let path = file.files.path;
    fileName = file.files.name;
    let newPath = PATH + fileName;
    FS.copyFile(path, newPath, (error) => {
      if (error) throw error;

      let workbook = XLSX.readFile(PATH + fileName);
      let sheetNameList = workbook.SheetNames;
      let sheet3 = workbook.Sheets[sheetNameList[2]];
      let data = XLSX.utils.sheet_to_json(sheet3, {header: 1, range: 1});

      let dataInsert = [];
      data.forEach(function (row) {
        dataInsert.push({
          code:row[0],
          name:row[1],
        })
      });

      Districts.bulkCreate(dataInsert);
    });
  });
  response.json({
    status:200,
    message: "success"
  });
};

var index = (request, response) => {
  Districts.findAll()
    .then(function (districts) {
      response.json(districts);
    });
};

module.exports.uploads = uploads;
module.exports.index = index;