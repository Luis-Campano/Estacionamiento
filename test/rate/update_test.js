const chai = require('chai');
const chaiHttp = require('chai-http');
const vehicle = require('../../models/vehicle');
const expect = chai.expect;

chai.use(chaiHttp);
const url = 'http://localhost:5000';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyLCJlbWFpbCI6InJvYmVydG8ubHVpcy5jYW1wYW5vQGdtYWlsLmNvbSIsInJvbCI6ImFkbWluIn0sImlhdCI6MTY1OTY1MTc4MCwiZXhwIjoxNjU5OTEwOTgwfQ.P0MLQUfV3U6w9C86e9CEdKJw9OtSE-2mXgYUGnGzlP4';

// bloque de Actualizar Tarifa
describe('Tarifa', () => {
    // primer escenario
    it('Actualizar una tarifa válida', (done) => {
        chai.request(url)
            .put('/tarifa/update/4')
            .set({ 'Authorization': `jwt ${token}` })
            .send({
                type: 'Alta',
                quota: 20,
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