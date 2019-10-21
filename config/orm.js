var connection = require("../config/connection");
// connects to the folder config<connection
function createQmarks(num) {
  var arr = [];
  for (var i = 0; i < num; i++) {
    arr.push("?");
  }
  return arr.toString();
}
// Creates and adds question marks every time a question is asked
function translateSql(ob) {
  var arr = [];
//  Gives open bracket for array?
  for (var key in ob) {
    // It checks for keys in Object
    var value = ob[key];
    // Declared Variable Value equal to the key for the object
    if (Object.hasOwnProperty.call(ob, key)) {
      // Then it declares that If an object has its own property "Call" the Object and Key
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        // states that If Value is equal to string and has a value yet to be declared push it in the key.
        value = "'" + value + "'";
      }
      arr.push(key + "=" + value);
      // tells it to push the array of all values and key in the array. 
    }
  }
  return arr.toString();
  // tells it to return all arrays to the string
}

var orm = {
  // declares the data in the Object-Relational-Mapper 
  selectAll: function(table, cb) {
    // first function is a SelectAll Function with a table and a call back
    var dbQuery = "SELECT * FROM " + table + ";";
// Declares a variable of "dbQuery" equal to the Data in the table.
    connection.query(dbQuery, function(err, res) {
      // Tells it to output an error for a response in the function connection if there is an actual error
      if (err) {
        // says if theres an error throw an error
            throw err;
      }
      // Tells it to callback the response
      cb(res);
    });
  },
  insertOne: function(table, cols, vals, cb) {
    // creates the function "insertOne" then tells it to bring in dbQuery and InsertInto table, columns, values, and call back
    var dbQuery =
      "INSERT INTO " +
      table +
      " (" +
      cols.toString() +
      ") " +
      "VALUES (" +
      createQmarks(vals.length) +
      ") ";

    console.log(dbQuery);
    // tells it to console.log (dbquery)
    connection.query(dbQuery, vals, function(err, res) {
      // tells it to output connection query into the dbquery.
      if (err) {
        throw err;
      }
      cb(res);
    });
  },
  updateOne: function(table, objColVals, condition, cb) {
    // declares the function update one, and brings in tables, objectcolumnvalues, condition, and call back
    var dbQuery =
      "UPDATE " +
      table +
      " SET " +
      translateSql(objColVals) +
      " WHERE " +
      condition;

    console.log(dbQuery);

    connection.query(dbQuery, function(err, res) {
      if (err) {
        throw err;
      }
      cb(res);
    });
  },
  deleteOne: function(table, condition, cb) {
    // tells it to deleteone, or delete the newest information once finneshed, brings in table, condition, call back
    var dbQuery = "DELETE FROM " + table + " WHERE " + condition;
    // tells it to delete from the table where the condition exists (That it wants deleted later)
    console.log(dbQuery);
    // console logs the most recent dbquery
    connection.query(dbQuery, function(err, res) {
      if (err) {
        throw err;
      }
      cb(res);
    });
  }
};
module.exports = orm;
// tells it to export the Object-Relational-Mapper 