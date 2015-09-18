var fs = require("fs");
var file = "/Users/yc05ps3/test.db";
var exists = fs.existsSync(file);


var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(file);


db.each("SELECT * from employee", function(err, row) {
    console.log(row.id + ": " + row.name);
});


db.close();