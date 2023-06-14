const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
require('dotenv').config();


chai.use(chaiHttp);
const url = process.env.URL_ACCESS;
const token = process.env.TOKEN_ACCESS;
// Bloque de Buscar Cliente
describe('Customer', () => {
    //primer escenario
    it('Buscar un cliente válido', (done) => {
        chai.request(url)
            .get('/customer/search?q=Juan')
            .set({ 'Authorization': `jwt ${token}` })
            .end((error, response) => {
                //validar lo que se escribio
                expect(response).to.have.status(200);
                done();
            });
    });
    
    //segundo escenario
    it('Mostrar el mensaje "Sin resultados" cuando no se encuentre un cliente', (done) => {
        chai.request(url)
            .get('/customer/search?q=wa')
            .set({ 'Authorization': `jwt ${token}` })
            .end((error, response) => {
                //validar lo que se escribio
                expect(response).to.have.status(404);
                expect(response.body).to.have.property('message');
                done();
            });
    });

    //tecer escenario
    it('Mostrar error cuando la ruta de busqueda sea incorrecta', (done) => {
        chai.request(url)
            .get('/customer/search?=Roberto')
            .set({ 'Authorization': `jwt ${token}` })
            .end((error, response) => {
                //validar lo que se escribio
                expect(response).to.have.status(500);
                expect(response.body).to.have.property('message');
                done();
            });
    });
});