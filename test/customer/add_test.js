const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);
const url = 'http://localhost:5000';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyLCJlbWFpbCI6InJvYmVydG8ubHVpcy5jYW1wYW5vQGdtYWlsLmNvbSIsInJvbCI6ImFkbWluIn0sImlhdCI6MTY1OTY1MTc4MCwiZXhwIjoxNjU5OTEwOTgwfQ.P0MLQUfV3U6w9C86e9CEdKJw9OtSE-2mXgYUGnGzlP4';

// bloque de Agregar Cliente
describe('Customer', () => {
    // primer escenario
    it('Agregar un nuevo cliente válido', (done) => {
        chai.request(url)
            .post('/customer')
            .set({ 'Authorization': `jwt ${token}` })
            .send({
                name: 'Juan',
                lastName: 'Guzman',
                email: 'juan.guzman@gmail.com',
                phone: '7351234567',
            })
            .end((error, response) => {
                //validar lo que se escribio
                expect(response).to.have.status(200);
                expect(response.body).to.have.property('customer');
                expect(response.body).to.have.property('message');
                done();
            });
    });

    // segundo escenario
    it('Error al agregar un nuevo cliente con datos faltantes', (done) => {
        chai.request(url)
            .post('/customer')
            .set({ 'Authorization': `jwt ${token}` })
            .send({
                lastName: 'Guzman',
                email: 'juan.guzman@gmail.com',
                phone: '7351234567',
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
    it('Error al agregar un nuevo cliente con datos incorrectos', (done) => {
        chai.request(url)
            .post('/customer')
            .set({ 'Authorization': `jwt ${token}` })
            .send({
                name: 'Juan',
                lastName: 'Guzman',
                email: 'juan.guzman@gmail',
                phone: '735123456780',
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