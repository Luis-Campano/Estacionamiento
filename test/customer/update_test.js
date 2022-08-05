const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);
const url = 'http://localhost:5000';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyLCJlbWFpbCI6InJvYmVydG8ubHVpcy5jYW1wYW5vQGdtYWlsLmNvbSIsInJvbCI6ImFkbWluIn0sImlhdCI6MTY1OTY2NzQxMSwiZXhwIjoxNjU5OTI2NjExfQ.PNmGZZE7qvsuICmro09jQce-Tpkx-nI2pl8rqGd4xNk';
// Bloque de Actualizar Cliente
describe('Customer', () => {
    // primer escenario
    it('Actualizar un cliente válido', (done) => {
        chai.request(url)
            .put('/customer/update/2')
            .set({ 'Authorization': `jwt ${token}` })
            .send({
                name: 'Luis Roberto',
                lastName: 'Campano',
                email: 'roberto.luis.campano@gmail.com',
                phone: '0000000000',
            })
            .end((error, response) => {
                //validar lo que se escribio
                expect(response).to.have.status(200);
                expect(response.body).to.have.property('message');
                done();
            });
    });
    
    // segundo escenario
    it('Error al actualizar un cliente con datos faltantes', (done) => {
        chai.request(url)
            .put('/customer/update/2')
            .set({ 'Authorization': `jwt ${token}` })
            .send({
                name: 'Luis Roberto',
                lastName: '',
                email: 'roberto.luis.campano@gmail.com',
                phone: '0000000000',
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
    it('Error al actualizar un cliente con datos incorrectos', (done) => {
        chai.request(url)
            .put('/customer/update/2')
            .set({ 'Authorization': `jwt ${token}` })
            .send({
                name: 'Luis Roberto',
                lastName: 'Campano',
                email: 'roberto.luis.campano',
                phone: '000000',
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
