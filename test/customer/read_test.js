const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
require('dotenv').config();


chai.use(chaiHttp);
const url = process.env.URL_ACCESS;
const token = process.env.TOKEN_ACCESS;// Bloque de Leer Cliente
describe('Customer', () => {
    // primer escenario
    it('Leer un cliente válido', (done) => {
        chai.request(url)
            .get('/customer/show/2')
            .set({ 'Authorization': `jwt ${token}` })
            .end((error, response) => {
                //validar lo que se escribio
                expect(response).to.have.status(200);
                expect(response.body).to.have.property('id');
                expect(response.body).to.have.property('name');
                expect(response.body).to.have.property('lastName');
                expect(response.body).to.have.property('email');
                expect(response.body).to.have.property('phone');
                done();
            });
    });

    // segundo escenario
    it('Error al leer un cliente no existente', (done) => {
        chai.request(url)
            .get('/customer/show/1')
            .set({ 'Authorization': `jwt ${token}` })
            .end((error, response) => {
                //validar lo que se escribio
                expect(response).to.have.status(404);
                expect(response.body).to.have.property('message');
                done();
            });
    });
    
    // tecer escenario
    it('Leer todos los clientes', (done) => {
        chai.request(url)
            .get('/customers')
            .set({ 'Authorization': `jwt ${token}` })
            .end((error, response) => {
                //validar lo que se escribio
                expect(response).to.have.status(200);
                done();
            });
    });

});