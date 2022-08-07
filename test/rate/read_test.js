const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);

const url = 'http://localhost:5000';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyLCJlbWFpbCI6InJvYmVydG8ubHVpcy5jYW1wYW5vQGdtYWlsLmNvbSIsInJvbCI6ImFkbWluIn0sImlhdCI6MTY1OTY2NzQxMSwiZXhwIjoxNjU5OTI2NjExfQ.PNmGZZE7qvsuICmro09jQce-Tpkx-nI2pl8rqGd4xNk';

// Bloque de Leer Tarifa
describe('Tarifa', () => {
    // primer escenario
    it('Leer una tarifa', (done) => {
        chai.request(url)
            .get('/tarifa/4')
            .set({ 'Authorization': `jwt ${token}` })
            .end((error, response) => {
                //validar lo que se escribio
                expect(response).to.have.status(200);
                expect(response.body).to.have.property('id');
                expect(response.body).to.have.property('type');
                expect(response.body).to.have.property('quota');
                expect(response.body).to.have.property('tolerance');
                done();
            });
    });

    // segundo escenario
    it('Error al leer una tarifa no existente', (done) => {
        chai.request(url)
            .get('/tarifa/1000')
            .set({ 'Authorization': `jwt ${token}` })
            .end((error, response) => {
                //validar lo que se escribio
                expect(response).to.have.status(404);
                expect(response.body).to.have.property('message');
                done();
            });
    });

    // tecer escenario
    it('Leer todas las tarifas', (done) => {
        chai.request(url)
            .get('/tarifas')
            .set({ 'Authorization': `jwt ${token}` })
            .end((error, response) => {
                //validar lo que se escribio
                expect(response).to.have.status(200);
                done();
            });
    });
});