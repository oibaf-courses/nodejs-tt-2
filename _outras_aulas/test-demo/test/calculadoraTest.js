const assert = require('assert');
const calculadora = require('../calculadora');

describe('calculadora', () => {
    describe('somar', () => {
        it('1 + 1 deve ser igual a 2', () => {
            const resultado = calculadora.somar(1, 1);
            assert.equal(resultado, 2);
        });
        it('2 + 3 deve ser igual a 5', () => {
            const resultado = calculadora.somar(2, 3);
            assert.equal(resultado, 5);
        });
    });
});