const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);
const url = 'http://localhost:5000';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6ImFsZ29AYWxnby5jb20iLCJyb2wiOiJzdXBlciJ9LCJpYXQiOjE2NTk5MTYyNzYsImV4cCI6MTY2MDAwMjY3Nn0.ErIEbA4xTZlNRURsviUiNizm8spbRp-lI26xQs3C1q0';

// bloque de Agregar Cliente
describe('Registro Crear', () => {
    // primer escenario
    it('Agregar un nuevo registro válido', (done) => {
        chai.request(url)
            .post('/registro')
            .set({ 'Authorization': `jwt ${token}` })
            .send({
                vehicleId: 4,
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