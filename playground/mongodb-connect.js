const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/ToDoApp', function(err, db){
    if(err) {
        return console.log('db connection failed');
    } else {
        console.log('connected to mongodb');
    }
    db.collection('Todos').insertOne({
        text:'start eating in the morning',
        completed: false,
    },(err, result) => {
        if(err) {
            return console.log('cant execute query');
        } 
        console.log(result.ops, undefined, 2);
    });
    db.close();
});
