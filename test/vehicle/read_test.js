const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);

const url = 'http://localhost:5000';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyLCJlbWFpbCI6InJvYmVydG8ubHVpcy5jYW1wYW5vQGdtYWlsLmNvbSIsInJvbCI6ImFkbWluIn0sImlhdCI6MTY1OTY2NzQxMSwiZXhwIjoxNjU5OTI2NjExfQ.PNmGZZE7qvsuICmro09jQce-Tpkx-nI2pl8rqGd4xNk';

// Bloque de Leer Vehículo
describe('Vehicle', () => {
    // primer escenario
    it('Leer un vehículo', (done) => {
        chai.request(url)
            .get('/vehiculo/show/7')
            .set({ 'Authorization': `jwt ${token}` })
            .end((error, response) => {
                //validar lo que se escribio
                expect(response).to.have.status(200);
                expect(response.body).to.have.property('id');
                expect(response.body).to.have.property('lincesPlate');
                expect(response.body).to.have.property('brand');
                expect(response.body).to.have.property('model');
                expect(response.body).to.have.property('color');
                done();
            });
    });

    // segundo escenario
    it('Error al leer un vehículo no existente', (done) => {
        chai.request(url)
            .get('/vehiculo/show/1000')
            .set({ 'Authorization': `jwt ${token}` })
            .end((error, response) => {
                //validar lo que se escribio
                expect(response).to.have.status(404);
                expect(response.body).to.have.property('message');
                done();
            });
    });

    // tecer escenario
    it('Leer todos los vehículos', (done) => {
        chai.request(url)
            .get('/vehiculos')
            .set({ 'Authorization': `jwt ${token}` })
            .end((error, response) => {
                //validar lo que se escribio
                expect(response).to.have.status(200);
                done();
            });
    });
});
