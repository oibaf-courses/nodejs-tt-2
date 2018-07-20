const { MongoBackend } = require('../database')

class Produto extends MongoBackend {
    constructor(id, nome, categoriaId, preco) {
        super();
        if (typeof id === 'object') {
            var { id, nome, categoriaId, preco } = id;
        }
        this.id = id;
        this.nome = nome;
        this.categoriaId = categoriaId;
        this.preco = preco;
    }

    static async insert(obj) {
        if (!obj.nome || !obj.preco || obj.preco < 0) {
            return false;
        }
        const count = await this.count({nome: obj.nome});
        if(count > 0) {
            return false;
        }
        const result = super.insert(obj);
        return result;
    };

    static getCollectionName() {
        return "Produto";
    }
}

class Categoria extends MongoBackend {
    constructor(id, nome) {
        super();
        if (typeof id === 'object') {
            var { id, nome, categoriaId, preco } = id;
        }
        this.id = id;
        this.nome = nome;
    };

    static getCollectionName() {
        return "Categoria";
    }


}

module.exports = {
    Produto,
    Categoria
};