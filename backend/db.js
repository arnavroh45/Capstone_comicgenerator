const { MongoClient } = require("mongodb");
let dbconnection;

module.exports = {
    connectToDb: (cb) => {
        MongoClient.connect('mongodb+srv://agamdawra01:55n65ELpKIK4HyZy@cluster0.0suh2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
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
    getDb: () => {
        if (!dbconnection) {
            throw new Error("Database not initialized. Call connectToDb first.");
        }
        return dbconnection;
    }
};