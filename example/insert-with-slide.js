var hs = require('../index');
var asyncMap = require('slide').asyncMap;

var insertRecords = [
  [200, 9999, null],
  [300, 9998, null],
  [400, 9997, null],
  [500, 9996, null]
];

//hs._debug = true;
var con = hs.connect({port : 9999, auth: 'node'});
con.on('connect', function() {
  con.openIndex('test', 'EMPLOYEE', 'PRIMARY',
                ['EMPLOYEE_ID', 'EMPLOYEE_NO', 'EMPLOYEE_NAME'],
                function(err, index) {
    if (err) {
      console.log(err);
      con.close();
      return;
    }
    asyncMap(insertRecords, function(rec, callback) {
      index.insert(rec, callback);
    }, function(err, rows) {
      if (err) {
        console.log(err);
        con.close();
        return;
      }
      console.log(rows.length + ' row(s) inserted');
      con.close();
    });
  });
});
con.on('error', function(err) {
  console.log(err);
});
