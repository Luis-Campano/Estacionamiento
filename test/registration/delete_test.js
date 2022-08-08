const chai = require('chai');
const chaiHttp = require('chai-http');
const vehicle = require('../../models/vehicle');
const expect = chai.expect;

chai.use(chaiHttp);
const url = 'http://localhost:5000';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6ImFsZ29AYWxnby5jb20iLCJyb2wiOiJzdXBlciJ9LCJpYXQiOjE2NTk5MjE3MTMsImV4cCI6MTY2MDAwODExM30.TolPpkkiXRTR6Bb5-didgqQLHYKjBIOuaRdCDl4MDvo';

// bloque de Eliminar Tarifa
describe('Registros Eliminar', () => {
    // primer escenario
    it('Eliminar una registro válida', (done) => {
        chai.request(url)
            .delete('/registro/delete/20')
            .set({ 'Authorization': `jwt ${token}` })
            .end((error, response) => {
                //validar lo que se escribio
                expect(response).to.have.status(200);
                expect(response.body).to.have.property('message');
                done();
            });
    });

    // segundo escenario
    it('Error al eliminar una tarifa no existente', (done) => {
        chai.request(url)
            .delete('/registro/delete/60')
            .set({ 'Authorization': `jwt ${token}` })
            .end((error, response) => {
                //validar lo que se escribio
                expect(response).to.have.status(404);
                expect(response.body).to.have.property('message');
                done();
            });
    });

    // tercer escenario
    it('Error al querer eliminar una tarifa y no agregar id', (done) => {
        chai.request(url)
            .delete('/registro/delete/a')
            .set({ 'Authorization': `jwt ${token}` })
            .end((error, response) => {
                //validar lo que se escribio
                expect(response).to.have.status(500);
                expect(response.body).to.have.property('message');
                done();
            });
    });
});