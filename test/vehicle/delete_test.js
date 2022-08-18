const chai = require('chai');
const chaiHttp = require('chai-http');
const vehicle = require('../../models/vehicle');
const expect = chai.expect;
require('dotenv').config();

chai.use(chaiHttp);
const url = process.env.URL_ACCESS;
const token = process.env.TOKEN_ACCESS;

// bloque de Eliminar Vehículo
describe('Vehicle', () => {
    // primer escenario
    it('Eliminar un vehículo válido', (done) => {
        chai.request(url)
            .delete('/vehiculo/delete/7')
            .set({ 'Authorization': `jwt ${token}` })
            .end((error, response) => {
                //validar lo que se escribio
                expect(response).to.have.status(200);
                expect(response.body).to.have.property('message');
                done();
            });
    });

    // segundo escenario
    it('Error al eliminar un vehiculo no existente', (done) => {
        chai.request(url)
            .delete('/vehiculo/delete/1000')
            .set({ 'Authorization': `jwt ${token}` })
            .end((error, response) => {
                //validar lo que se escribio
                expect(response).to.have.status(404);
                expect(response.body).to.have.property('message');
                done();
            });
    });

    // tercer escenario
    it('Error al querer eliminar un vehículo y no agregar id', (done) => {
        chai.request(url)
            .delete('/vehiculo/delete/a')
            .set({ 'Authorization': `jwt ${token}` })
            .end((error, response) => {
                //validar lo que se escribio
                expect(response).to.have.status(500);
                expect(response.body).to.have.property('message');
                done();
            });
    });
});