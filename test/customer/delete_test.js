const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
require('dotenv').config();


chai.use(chaiHttp);
const url = process.env.URL_ACCESS;
const token = process.env.TOKEN_ACCESS;
// Bloque de Eliminar Cliente
describe('Customer', () => {
    // primer escenario
    it('Eliminar un cliente válido', (done) => {
        chai.request(url)
            .delete('/customer/delete/14')
            .set({ 'Authorization': `jwt ${token}` })
            .end((error, response) => {
                //validar lo que se escribio
                expect(response).to.have.status(200);
                expect(response.body).to.have.property('message');
                done();
            });
    });

    // segundo escenario
    it('Error al eliminar un cliente no existente', (done) => {
        chai.request(url)
            .delete('/customer/delete/1')
            .set({ 'Authorization': `jwt ${token}` })
            .end((error, response) => {
                //validar lo que se escribio
                expect(response).to.have.status(404);
                expect(response.body).to.have.property('message');
                done();
            });
    });
    
    // tercer escenario
    it('Error al querer eliminar un cliente y no agregar id', (done) => {
        chai.request(url)
            .delete('/customer/delete/a')
            .set({ 'Authorization': `jwt ${token}` })
            .end((error, response) => {
                //validar lo que se escribio
                expect(response).to.have.status(500);
                expect(response.body).to.have.property('message');
                done();
            });
    });
});
