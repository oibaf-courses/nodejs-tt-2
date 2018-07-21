const assert = require('assert');
const categoriasModels = require('../categorias/models');

describe('Categorias', () => {
    afterEach(async () => {
        await categoriasModels.Produto.deleteMany({nome: 'nome-repetido'});
        await categoriasModels.Produto.deleteMany({nome: 'Teste'});
    });
    describe('inserirProduto', () => {
        const inseridoUmRegistro = { ok: 1, n: 1 };

        it('deve retornar falso ao tentar inserir produto sem nome', async () => {
            const produto = {};
            const result = await categoriasModels.Produto.insert(produto);
            assert.equal(result, false);
        });

        it('deve retornar falso ao tentar inserir produto sem preço', async () => {
            const produto = { nome: 'Teste', preco: null };
            const result = await categoriasModels.Produto.insert(produto);
            assert.equal(result, false);
        });

        it('deve retornar falso ao tentar inserir produto com preço negativo', async () => {
            const produto = { nome: 'Teste', preco: -10 };
            const result = await categoriasModels.Produto.insert(produto);
            assert.equal(result, false);
        });

        it('deve retornar falso ao tentar inserir produto com nome repetido', async () => {
            const produto = { nome: 'nome-repetido', preco: 10 };
            await categoriasModels.Produto.insert(produto);
            const result = await categoriasModels.Produto.insert(produto);
            assert.equal(result, false);
        });

        it('deve retornar sucesso ao tentar inserir produto com nome e preço', async () => {
            const produto = { nome: 'Teste', preco: 10 };
            const result = await categoriasModels.Produto.insert(produto);
            assert.deepEqual(result, inseridoUmRegistro);
        });
        after(async () => {
            await categoriasModels.Produto.deleteMany({nome: 'nome-repetido'});
        });
    });
});