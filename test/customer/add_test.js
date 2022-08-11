const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);
const url = 'http://localhost:5000';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJlbWFpbCI6Imx1aXMuY2FtcGFuby5lc3BAZ21haWwuY29tIiwicm9sIjoic3VwZXIifSwiaWF0IjoxNjYwMDgzMzI1LCJleHAiOjE2NjAzNDI1MjV9.cPI-pERsBVa0FI0pAYVBUq5LPJW1HUVptBH8ZVpJfPI';
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
                email: 'juan.mancito@gmail.com',
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
                name: '',
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
                phone: '73512345678099',
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