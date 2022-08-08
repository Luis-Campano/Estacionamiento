const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);
const url = 'http://localhost:5000';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6ImFsZ29AYWxnby5jb20iLCJyb2wiOiJzdXBlciJ9LCJpYXQiOjE2NTk5MzI1OTgsImV4cCI6MTY2MDAxODk5OH0.j7EIw3lucAg1VVf-QKT9Rr0Spvk8u-Oeefk2QSE6EEs';

// Bloque de Leer Cliente
describe('Usuarios Leer', () => {
    // primer escenario
    it('Leer un cliente válido', (done) => {
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
    it('Error al leer un cliente no existente', (done) => {
        chai.request(url)
            .get('/user/20')
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