var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');
    fs = require('fs');

var url = 'mongodb://localhost:27017/';

MongoClient.connect(url, function(err, client) {
    // Assert that err == null
    assert.equal(null, err);
    var db = client.db("machines");
    console.log("Successfully connected to server");

    // Find some documents in our collection
    var workitems = db.collection('Workitem').find({}).toArray(function(err, workitems) {
        if (err) throw err;
        console.log(workitems.length);
        var data = JSON.stringify(workitems, null, 2, 100);
        fs.writeFile('data.js', data, 'utf8', function (err) {
          if (err) {
              return console.log(err);
          }
      
          console.log("Workitems saved");
          // Close the DB
          client.close();
      }); 

    });

    // Declare success
    console.log("Called find()");
});


