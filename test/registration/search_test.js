const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);
const url = 'http://localhost:5000';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6ImFsZ29AYWxnby5jb20iLCJyb2wiOiJzdXBlciJ9LCJpYXQiOjE2NTk5MjE3MTMsImV4cCI6MTY2MDAwODExM30.TolPpkkiXRTR6Bb5-didgqQLHYKjBIOuaRdCDl4MDvo';

// bloque de Buscar Tarifa
describe('Registro Búscar', () => {
    //primer escenario
    it('Buscar una placa de vehículo existente.', (done) => {
        chai.request(url)
            .get('/search-registrations?q=SS6S')
            .set({ 'Authorization': `jwt ${token}` })
            .end((error, response) => {
                //validar lo que se escribio
                expect(response).to.have.status(200);
                done();
            });
    });

    //segundo escenario
    it('Mostrar el mensaje "Sin resultados" cuando no se encuentre una una placa.', (done) => {
        chai.request(url)
            .get('/search-registrations?q=s5s5')
            .set({ 'Authorization': `jwt ${token}` })
            .end((error, response) => {
                //validar lo que se escribio
                expect(response).to.have.status(404);
                expect(response.body).to.have.property('message');
                done();
            });
    });

    //tecer escenario
    it('Mostrar error cuando la ruta de busqueda sea incorrecta', (done) => {
        chai.request(url)
            .get('/search-registrations?=SS6S')
            .set({ 'Authorization': `jwt ${token}` })
            .end((error, response) => {
                //validar lo que se escribio
                expect(response).to.have.status(500);
                expect(response.body).to.have.property('message');
                done();
            });
    });
});