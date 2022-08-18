const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
require('dotenv').config();

chai.use(chaiHttp);
const url = process.env.URL_ACCESS;
const token = process.env.TOKEN_ACCESS;

// bloque de Agregar Registro
describe('Registro', () => {
    // primer escenario
    it('Agregar un nuevo registro válido', (done) => {
        chai.request(url)
            .post('/registro')
            .set({ 'Authorization': `jwt ${token}` })
            .send({
                vehicleId: 8,
            })
            .end((error, response) => {
                //validar lo que se escribio
                expect(response).to.have.status(200);
                expect(response.body).to.have.property('registration');
                expect(response.body).to.have.property('message');
                done();
            });
    });

    // segundo escenario
    it('Error al agregar un nuevo registro con datos desconsido', (done) => {
        chai.request(url)
            .post('/registro')
            .set({ 'Authorization': `jwt ${token}` })
            .send({
                vehicleId:6 
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
    it('Error al agregar un nuevo registro con datos incorrectos', (done) => {
        chai.request(url)
            .post('/registro')
            .set({ 'Authorization': `jwt ${token}` })
            .send({
                vehicleId: 'dss',
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