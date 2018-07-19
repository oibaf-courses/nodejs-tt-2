const { MongoClient } = require('mongodb')

const url = process.env.MONGO_URL || 'mongodb://localhost:27017';
const dbName = process.env.MONGO_DATABASE || 'catbag-express';

let DB;

const initDB = async () => {
    if (!DB) {
        DB = (await MongoClient.connect(url, { useNewUrlParser: true })).db(dbName);
    }
    return DB;
}

class MongoBackend {

    static async insert(obj) {
        const collection = await this.getCollection();
        const { result } = await collection.insert(obj);
        console.log(result);
        return result;
    };
    
    static async find(query) {
        const collection = await this.getCollection();
        if (!query) {
            query = {};
        }
        const users = await collection.find(query).toArray();
        console.log(users);
        return users;
    };
    
    static async delete(query) {
        const collection = await this.getCollection();
        if (!query) {
            query = {};
        }
        const { result }  = await collection.deleteOne(query);
        console.log(result);
        return result;
    }

    static async update(query, newObj) {
        const collection = await this.getCollection();
        if (!query) {
            query = {};
        }
        const { result }  = await collection.updateOne(query, newObj);
        console.log(result);
        return result;
    }

    static getCollectionName() {
        return null;
    }

    static async getCollection() {
        return (await initDB()).collection(
            this.getCollectionName()
        );
    }
}


module.exports = { MongoBackend }