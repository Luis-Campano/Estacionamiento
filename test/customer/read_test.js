const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);
const url = 'http://localhost:5000';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyLCJlbWFpbCI6InJvYmVydG8ubHVpcy5jYW1wYW5vQGdtYWlsLmNvbSIsInJvbCI6ImFkbWluIn0sImlhdCI6MTY1OTY2NzQxMSwiZXhwIjoxNjU5OTI2NjExfQ.PNmGZZE7qvsuICmro09jQce-Tpkx-nI2pl8rqGd4xNk';
// Bloque de Leer Cliente
describe('Customer', () => {
    // primer escenario
    it('Leer un cliente válido', (done) => {
        chai.request(url)
            .get('/customer/show/2')
            .set({ 'Authorization': `jwt ${token}` })
            .end((error, response) => {
                //validar lo que se escribio
                expect(response).to.have.status(200);
                expect(response.body).to.have.property('id');
                expect(response.body).to.have.property('name');
                expect(response.body).to.have.property('lastName');
                expect(response.body).to.have.property('email');
                expect(response.body).to.have.property('phone');
                done();
            });
    });

    // segundo escenario
    it('Error al leer un cliente no existente', (done) => {
        chai.request(url)
            .get('/customer/show/1')
            .set({ 'Authorization': `jwt ${token}` })
            .end((error, response) => {
                //validar lo que se escribio
                expect(response).to.have.status(404);
                expect(response.body).to.have.property('message');
                done();
            });
    });
    
    // tecer escenario
    it('Error al querer leer un cliente y no agregar su (id)', (done) => {
        chai.request(url)
            .get('/customer/show/')
            .set({ 'Authorization': `jwt ${token}` })
            .end((error, response) => {
                //validar lo que se escribio
                expect(response).to.have.status(404);
                done();
            });
    });

});