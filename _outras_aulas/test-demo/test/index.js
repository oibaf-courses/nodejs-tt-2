const assert = require('assert');

describe('Array', () => {
    const array = ['a', 'b', 'c'];
    const elementoExistente = 'b';
    const indexElementoExistente = 1;
    const elementoNaoExistente = 'd';
    
    before(() => {
        
    });

    describe('indexOf', () => {
        it('deve retornar -1 quando o elemento não estiver no array', () => {
            const retorno = array.indexOf(elementoNaoExistente);
            assert.equal(retorno, -1);
        });

        it('deve retornar índice do elemento quando estiver no array', () => {
            const retorno = array.indexOf(elementoExistente);
            assert.equal(retorno, indexElementoExistente);
        });
    });
});