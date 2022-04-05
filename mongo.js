const { Mongo, ServerApiVersion } = require('mongodb');
const MongoClient = require('mongodb').MongoClient

const uri = "mongodb+srv://mongodbtrial:mongodbtrial@cluster0.mzf3e.mongodb.net/db01?retryWrites=true&w=majority";
//const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
module.exports.insert = async function(insert, id) {
    module.exports.result = 0;
    console.log("mongo")

    //id==1,2,3 insert one ,insertMany,find 

    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
    await gh();

    async function gh() {
        console.log("mongo")
        client.connect(err => {

            console.log("connect " + err)
            const db = client.db("db01")


            const collection = db.collection("collection");
            console.log(insert + "" + id);
            switch (id) {


                case 1:
                    {
                        console.log("mongo")
                        collection.insertOne(insert, function(err, result) {
                            if (err) throw err;
                            module.exports.result = result;
                            console.log(result);
                            defaul(client);


                        });

                        //it closes client

                        // db.close();
                        break;

                    }
                case 2:
                    {
                        console.log("mongo")
                        collection.insertMany(insert, function(err, result) {
                            if (err) throw err;
                            console.log(result);
                            module.exports.result = result;
                            defaul(client);

                        });
                        break;
                    }
                case 3:
                    {
                        console.log("mongo")
                        collection.find({}).toArray(function(err, result) {
                            if (err) throw err;
                            console.log(result);
                            module.exports.result = result;


                            defaul(client);
                            //db.close();
                        });
                        break;
                    }
                case 4:
                    {
                        console.log("mongo")
                        collection.findOne(insert, function(err, result) {
                            if (err) throw err;
                            console.log(result);
                            module.exports.result = result;
                            defaul(client);




                        })
                        break;

                    }

                default:
                    {
                        console.log("not any case ")
                    }



            }


            // perform actions on the collection object

            //client.close();
        });
    }

    return 0;
}
module.exports.insertcall = async function(insert, id, callback) {
    module.exports.result = 0;
    console.log("mongo")

    //id==1,2,3 insert one ,insertMany,find 

    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
    await gh();

    async function gh() {
        console.log("mongo")
        client.connect(err => {

            console.log("connect " + err)
            const db = client.db("db01")


            const collection = db.collection("collection");
            console.log(insert + "" + id);
            switch (id) {


                case 1:
                    {
                        console.log("mongo")
                        collection.insertOne(insert, function(err, result) {
                            if (err) throw err;
                            module.exports.result = result;
                            console.log(result);
                            defaul(client);
                            return callback(result);


                        });

                        //it closes client

                        // db.close();
                        break;

                    }
                case 2:
                    {
                        console.log("mongo")
                        collection.insertMany(insert, function(err, result) {
                            if (err) throw err;
                            console.log(result);
                            module.exports.result = result;
                            defaul(client);
                            return callback(result);

                        });
                        break;
                    }
                case 3:
                    {
                        console.log("mongo")
                        collection.find({}).toArray(function(err, result) {
                            if (err) throw err;
                            console.log(result);
                            module.exports.result = result;


                            defaul(client);
                            return callback(result);
                            //db.close();
                        });
                        break;
                    }
                case 4:
                    {
                        console.log("mongo")
                        collection.findOne(insert, function(err, result) {
                            if (err) throw err;
                            console.log(result);
                            module.exports.result = result;
                            defaul(client);
                            return callback(result);




                        })
                        break;

                    }

                default:
                    {
                        console.log("not any case ")
                    }



            }


            // perform actions on the collection object

            //client.close();
        });
    }

    return 0;
}

function defaul(client) {
    //closes client or db connecttion
    client.close();
    console.log("close connection ")

}