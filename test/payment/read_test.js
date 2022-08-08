const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);
const url = 'http://localhost:5000';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6ImFsZ29AYWxnby5jb20iLCJyb2wiOiJzdXBlciJ9LCJpYXQiOjE2NTk5MzQ2ODksImV4cCI6MTY2MDAyMTA4OX0.b0fkzVJxTHqih-sZX8K2xcMvIZJMkYAmnq9pwkul7zU';

// Bloque de Leer pago
describe('Customer', () => {
    // primer escenario
    it('Leer un pago válido', (done) => {
        chai.request(url)
            .get('/pago/15')
            .set({ 'Authorization': `jwt ${token}` })
            .end((error, response) => {
                //validar lo que se escribio
                expect(response).to.have.status(200);
                expect(response.body).to.have.property('id');
                expect(response.body).to.have.property('payment');
                expect(response.body).to.have.property('registrationId');

                done();
            });
    });

    // segundo escenario
    it('Error al leer un pago no existente', (done) => {
        chai.request(url)
            .get('/pago/100')
            .set({ 'Authorization': `jwt ${token}` })
            .end((error, response) => {
                //validar lo que se escribio
                expect(response).to.have.status(404);
                expect(response.body).to.have.property('message');
                done();
            });
    });
    
    // tecer escenario
    it('Leer todos los pagos', (done) => {
        chai.request(url)
            .get('/pagos')
            .set({ 'Authorization': `jwt ${token}` })
            .end((error, response) => {
                //validar lo que se escribio
                expect(response).to.have.status(200);
                done();
            });
    });

});