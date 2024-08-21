const { MongoClient } = require("mongodb");
let dbconnection;

module.exports = {
    connectToDb: (cb) => {
        MongoClient.connect('mongodb://127.0.0.1:27017/Capstone')
            .then((client) => {
                console.log("Connected");
                dbconnection = client.db();
                cb(null); 
            })
            .catch(err => {
                console.log(err);
                cb(err); 
            });
    },
    getDb: () => dbconnection
};