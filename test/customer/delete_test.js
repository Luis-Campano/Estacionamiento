const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);
const url = 'http://localhost:5000';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJlbWFpbCI6Imx1aXMuY2FtcGFuby5lc3BAZ21haWwuY29tIiwicm9sIjoic3VwZXIifSwiaWF0IjoxNjU5Njc0MjgwLCJleHAiOjE2NTk5MzM0ODB9.Euemj2GtwVWG0NInv940g-9pZHhcwRReit6GgRup18k';

// Bloque de Eliminar Cliente
describe('Customer', () => {
    // primer escenario
    it('Eliminar un cliente válido', (done) => {
        chai.request(url)
            .delete('/customer/delete/23')
            .set({ 'Authorization': `jwt ${token}` })
            .end((error, response) => {
                //validar lo que se escribio
                expect(response).to.have.status(200);
                expect(response.body).to.have.property('message');
                done();
            });
    });

    // segundo escenario
    it('Error al eliminar un cliente no existente', (done) => {
        chai.request(url)
            .delete('/customer/delete/1')
            .set({ 'Authorization': `jwt ${token}` })
            .end((error, response) => {
                //validar lo que se escribio
                expect(response).to.have.status(404);
                expect(response.body).to.have.property('message');
                done();
            });
    });
    
    // tercer escenario
    it('Error al querer eliminar un cliente y no agregar id', (done) => {
        chai.request(url)
            .delete('/customer/delete/a')
            .set({ 'Authorization': `jwt ${token}` })
            .end((error, response) => {
                //validar lo que se escribio
                expect(response).to.have.status(500);
                expect(response.body).to.have.property('message');
                done();
            });
    });
});
