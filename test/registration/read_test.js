const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
require('dotenv').config();

chai.use(chaiHttp);
const url = process.env.URL_ACCESS;
const token = process.env.TOKEN_ACCESS;

// Bloque de Leer Registro
describe('Registro', () => {
    // primer escenario
    it('Leer un registro', (done) => {
        chai.request(url)
            .get('/registro/show/6')
            .set({ 'Authorization': `jwt ${token}` })
            .end((error, response) => {
                //validar lo que se escribio
                expect(response).to.have.status(200);
                done();
            });
    });

    // segundo escenario
    it('Error al leer un registro no existente', (done) => {
        chai.request(url)
            .get('/registro/show/200')
            .set({ 'Authorization': `jwt ${token}` })
            .end((error, response) => {
                //validar lo que se escribio
                expect(response).to.have.status(400);
                expect(response.body).to.have.property('message');
                done();
            });
    });

    // tecer escenario
    it('Leer todos los registros', (done) => {
        chai.request(url)
            .get('/registros')
            .set({ 'Authorization': `jwt ${token}` })
            .end((error, response) => {
                //validar lo que se escribio
                expect(response).to.have.status(200);
                done();
            });
    });
});