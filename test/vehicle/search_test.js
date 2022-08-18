const chai = require('chai');
const chaiHttp = require('chai-http');
const vehicle = require('../../models/vehicle');
const expect = chai.expect;
require('dotenv').config();

chai.use(chaiHttp);
const url = process.env.URL_ACCESS;
const token = process.env.TOKEN_ACCESS;

// bloque de Buscar Vehículo
describe('Vehicle', () => {
    //primer escenario
    it('Buscar un vehículo existente', (done) => {
        chai.request(url)
            .get('/vehiculos/search?q=Rolls Royce')
            .set({ 'Authorization': `jwt ${token}` })
            .end((error, response) => {
                //validar lo que se escribio
                expect(response).to.have.status(200);
                done();
            });
    });

    //segundo escenario
    it('Mostrar el mensaje "Sin resultados" cuando no se encuentre un vehículo', (done) => {
        chai.request(url)
            .get('/customer/search?q=Wes')
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
            .get('/vehiculos/search?=Rolls')
            .set({ 'Authorization': `jwt ${token}` })
            .end((error, response) => {
                //validar lo que se escribio
                expect(response).to.have.status(500);
                expect(response.body).to.have.property('message');
                done();
            });
    });
});
