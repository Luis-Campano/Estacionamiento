const chai = require('chai');
const chaiHttp = require('chai-http');
const vehicle = require('../../models/vehicle');
const expect = chai.expect;
require('dotenv').config();

chai.use(chaiHttp);
const url = process.env.URL_ACCESS;
const token = process.env.TOKEN_ACCESS;

// bloque de Eliminar Tarifa
describe('Tarifa', () => {
    // primer escenario
    it('Eliminar una tarifa válida', (done) => {
        chai.request(url)
            .delete('/tarifa/delete/5')
            .set({ 'Authorization': `jwt ${token}` })
            .end((error, response) => {
                //validar lo que se escribio
                expect(response).to.have.status(200);
                expect(response.body).to.have.property('message');
                done();
            });
    });

    // segundo escenario
    it('Error al eliminar una tarifa no existente', (done) => {
        chai.request(url)
            .delete('/tarifa/delete/1000')
            .set({ 'Authorization': `jwt ${token}` })
            .end((error, response) => {
                //validar lo que se escribio
                expect(response).to.have.status(404);
                expect(response.body).to.have.property('message');
                done();
            });
    });

    // tercer escenario
    it('Error al querer eliminar una tarifa y no agregar id', (done) => {
        chai.request(url)
            .delete('/tarifa/delete/a')
            .set({ 'Authorization': `jwt ${token}` })
            .end((error, response) => {
                //validar lo que se escribio
                expect(response).to.have.status(500);
                expect(response.body).to.have.property('message');
                done();
            });
    });
});