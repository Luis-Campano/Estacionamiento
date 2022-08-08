const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);

const url = 'http://localhost:5000';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6ImFsZ29AYWxnby5jb20iLCJyb2wiOiJzdXBlciJ9LCJpYXQiOjE2NTk5MjE3MTMsImV4cCI6MTY2MDAwODExM30.TolPpkkiXRTR6Bb5-didgqQLHYKjBIOuaRdCDl4MDvo';

// Bloque de Leer Tarifa
describe('Registro Ver', () => {
    // primer escenario
    it('Leer un registro', (done) => {
        chai.request(url)
            .get('/registro/4')
            .set({ 'Authorization': `jwt ${token}` })
            .end((error, response) => {
                //validar lo que se escribio
                expect(response).to.have.status(200);
                expect(response.body).to.have.property('id');
                done();
            });
    });

    // segundo escenario
    it('Error al leer una un registro no existente', (done) => {
        chai.request(url)
            .get('/registro/100')
            .set({ 'Authorization': `jwt ${token}` })
            .end((error, response) => {
                //validar lo que se escribio
                expect(response).to.have.status(404);
                expect(response.body).to.have.property('message');
                done();
            });
    });

    // tecer escenario
    it('Leer todos los registros', (done) => {
        chai.request(url)
            .get('/registros')
            .set({ 'Authorization': `jwt ${token}` })
            .end((error, response) => {
                //validar lo que se escribio
                expect(response).to.have.status(200);
                done();
            });
    });
});