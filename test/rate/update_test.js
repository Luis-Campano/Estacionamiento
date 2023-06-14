const chai = require('chai');
const chaiHttp = require('chai-http');
const vehicle = require('../../models/vehicle');
const expect = chai.expect;
require('dotenv').config();

chai.use(chaiHttp);
const url = process.env.URL_ACCESS;
const token = process.env.TOKEN_ACCESS;

// bloque de Actualizar Tarifa
describe('Tarifa', () => {
    // primer escenario
    it('Actualizar una tarifa válida', (done) => {
        chai.request(url)
            .put('/tarifa/update/2')
            .set({ 'Authorization': `jwt ${token}` })
            .send({
                type: 'motosss',
                quota: 25,
            })
            .end((error, response) => {
                //validar lo que se escribio
                expect(response).to.have.status(200);
                expect(response.body).to.have.property('message');
                done();
            });
    });

    // segundo escenario
    it('Error al actualizar una tarifa con datos faltantes', (done) => {
        chai.request(url)
            .put('/tarifa/update/4')
            .set({ 'Authorization': `jwt ${token}` })
            .send({
                type: '',
                tolerance: '',
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
    it('Error al actualizar una tarifa con datos incorrectos', (done) => {
        chai.request(url)
            .put('/tarifa/update/4')
            .set({ 'Authorization': `jwt ${token}` })
            .send({
                type: 'Alta*"$#"#$%$#',
                tolerance: '20"#$"$*!!',
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