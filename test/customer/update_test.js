const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);
const url = 'http://localhost:5000';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJlbWFpbCI6Imx1aXMuY2FtcGFuby5lc3BAZ21haWwuY29tIiwicm9sIjoic3VwZXIifSwiaWF0IjoxNjYwMDgzMzI1LCJleHAiOjE2NjAzNDI1MjV9.cPI-pERsBVa0FI0pAYVBUq5LPJW1HUVptBH8ZVpJfPI';
// Bloque de Actualizar Cliente
describe('Customer', () => {
    // primer escenario
    it('Actualizar un cliente válido', (done) => {
        chai.request(url)
            .put('/customer/update/8')
            .set({ 'Authorization': `jwt ${token}` })
            .send({
                name: 'Luis Roberto',
                lastName: 'Campano',
                email: 'roberto.luis.campano@gmail.com',
                phone: '0000000000',
            })
            .end((error, response) => {
                //validar lo que se escribio
                expect(response).to.have.status(200);
                expect(response.body).to.have.property('message');
                done();
            });
    });
    
    // segundo escenario
    it('Error al actualizar un cliente con datos faltantes', (done) => {
        chai.request(url)
            .put('/customer/update/2')
            .set({ 'Authorization': `jwt ${token}` })
            .send({
                name: 'Luis Roberto',
                lastName: '',
                email: 'roberto.luis.campano@gmail.com',
                phone: '0000000000',
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
    it('Error al actualizar un cliente con datos incorrectos', (done) => {
        chai.request(url)
            .put('/customer/update/2')
            .set({ 'Authorization': `jwt ${token}` })
            .send({
                name: 'Luis Roberto',
                lastName: 'Campano',
                email: 'roberto.luis.campano',
                phone: '000000',
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
