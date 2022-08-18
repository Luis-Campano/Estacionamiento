const chai = require('chai');
const chaiHttp = require('chai-http');
const vehicle = require('../../models/vehicle');
const expect = chai.expect;
require('dotenv').config();

chai.use(chaiHttp);
const url = process.env.URL_ACCESS;
const token = process.env.TOKEN_ACCESS;

// bloque de Actualizar Vehículo
describe('Vehicle', () => {
    // primer escenario

    it('Actualizar un vehículo válido', (done) => {
        chai.request(url)
            .put('/vehiculo/update/8')
            .set({ 'Authorization': `jwt ${token}` })
            .send({
                lincesPlate: 'Jabsu19',
                model: 'Ghost',
                color: 'Black',
            })
            .end((error, response) => {
                //validar lo que se escribio
                expect(response).to.have.status(200);
                expect(response.body).to.have.property('message');
                done();
            });
    });

    // segundo escenario
    it('Error al actualizar un vehículo con datos faltantes', (done) => {
        chai.request(url)
            .put('/vehiculo/update/7')
            .set({ 'Authorization': `jwt ${token}` })
            .send({
                lincesPlate: '',
                brand: '',
                model: 'Ghost',
                color: 'Black',
            })
            .end((error, response) => {
                //validar lo que se escribio
                expect(response).to.have.status(500);
                expect(response.body).to.have.property('error');
                expect(response.body).to.have.property('message');
                done();
            });
    });

    // tercer escenario
    it('Error al actualizar un vehículo con datos incorrectos', (done) => {
        chai.request(url)
            .put('/vehiculo/update/7')
            .set({ 'Authorization': `jwt ${token}` })
            .send({
                lincesPlate: '***/////------',
                brand: '------///////???',
                model: 'Ghost',
                color: 'Brown',
            })
            .end((error, response) => {
                //validar lo que se escribio
                expect(response).to.have.status(500);
                expect(response.body).to.have.property('error');
                expect(response.body).to.have.property('message');
                done();
            });
    });
});