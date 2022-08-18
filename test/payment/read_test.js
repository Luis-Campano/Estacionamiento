const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
require('dotenv').config();

chai.use(chaiHttp);
const url = process.env.URL_ACCESS;
const token = process.env.TOKEN_ACCESS;


// Bloque de Leer pago
describe('Pago', () => {
    // primer escenario
    it('Leer un pago válido', (done) => {
        chai.request(url)
            .get('/pago/11')
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
            .get('/pago/9')
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