const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'myproject';

MongoClient.connect(url, { useNewUrlParser: true }, async (err, client) => {
    console.log("Connected successfully to server");
    const db = client.db(dbName);

    // await insertUser(db);
    // await insertUser(db, [{ name: "Hue BR", email: "alguem@hue.com.br" }]);
    await findUsers(db, {email: "alguem@hue.com.br"});
    await deleteUser(db, {email: "alguem@hue.com.br"});

    client.close();
});


const insertUser = async (db, user) => {
    const collection = db.collection('users');
    if (!user) {
        user = { 
            name: "Ruth",
            email: "root@raiz.com"
        };
    }
     
     const { result } = await collection.insert(user);
     console.log(result);
};

const findUsers = async (db, query) => {
    const collection = db.collection('users');
    if (!query) {
        query = {};
    }
    const users = await collection.find(query).toArray();
    console.log(users);
};

const deleteUser = async (db, query) => {
    const collection = db.collection('users');
    if (!query) {
        query = {};
    }
    const { result }  = await collection.deleteMany(query);
    console.log(result);
}