const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);
const url = 'http://localhost:5000';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJlbWFpbCI6Imx1aXMuY2FtcGFuby5lc3BAZ21haWwuY29tIiwicm9sIjoic3VwZXIifSwiaWF0IjoxNjYwMDgzMzI1LCJleHAiOjE2NjAzNDI1MjV9.cPI-pERsBVa0FI0pAYVBUq5LPJW1HUVptBH8ZVpJfPI';

// bloque de Agregar Tarifa
describe('Tarifa', () => {
    // primer escenario
    it('Agregar una nueva tarifa', (done) => {
        chai.request(url)
            .post('/tarifa')
            .set({ 'Authorization': `jwt ${token}` })
            .send({
                type: 'Alta',
                quota: 15,
                tolerance: 20, // minutos
            })
            .end((error, response) => {
                //validar lo que se escribio
                expect(response).to.have.status(200);
                expect(response.body).to.have.property('rate');
                expect(response.body).to.have.property('message');
                done();
            });
    });

    // segundo escenario
    it('Error al agregar una nueva tarifa con datos faltantes', (done) => {
        chai.request(url)
            .post('/tarifa')
            .set({ 'Authorization': `jwt ${token}` })
            .send({
                type: 'Baja',
                quota: '',
                tolerance: 20, // minutos
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
    it('Error al agregar una nueva tarifa con datos incorrectos', (done) => {
        chai.request(url)
            .post('/tarifa')
            .set({ 'Authorization': `jwt ${token}` })
            .send({
                type: 'Baja 10m02!33',
                quota: 15,
                tolerance: 'adka10smal', // minutos
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