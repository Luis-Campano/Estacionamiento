const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
require('dotenv').config();

chai.use(chaiHttp);
const url = process.env.URL_ACCESS;
const token = process.env.TOKEN_ACCESS;

// Bloque de Leer Cliente
describe('Usuarios Leer', () => {
    // primer escenario
    it('Leer un usuario válido', (done) => {
        chai.request(url)
            .get('/user/1')
            .set({ 'Authorization': `jwt ${token}` })
            .end((error, response) => {
                //validar lo que se escribio
                expect(response).to.have.status(200);
                expect(response.body).to.have.property('id');
                expect(response.body).to.have.property('name');
                expect(response.body).to.have.property('email');
                expect(response.body).to.have.property('rol');
                expect(response.body).to.have.property('active')
                done();
            });
    });

    // segundo escenario
    it('Error al leer un usuario no existente', (done) => {
        chai.request(url)
            .get('/user/200')
            .set({ 'Authorization': `jwt ${token}` })
            .end((error, response) => {
                //validar lo que se escribio
                expect(response).to.have.status(500);
                expect(response.body).to.have.property('message');
                done();
            });
    });
    
    // tecer escenario
    it('Leer todos los clientes', (done) => {
        chai.request(url)
            .get('/users')
            .set({ 'Authorization': `jwt ${token}` })
            .end((error, response) => {
                //validar lo que se escribio
                expect(response).to.have.status(200);
                done();
            });
    });

});