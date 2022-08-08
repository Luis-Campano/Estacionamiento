const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);
const url = 'http://localhost:5000';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6ImFsZ29AYWxnby5jb20iLCJyb2wiOiJzdXBlciJ9LCJpYXQiOjE2NTk5MzI1OTgsImV4cCI6MTY2MDAxODk5OH0.j7EIw3lucAg1VVf-QKT9Rr0Spvk8u-Oeefk2QSE6EEs';


describe('Crear un usuario', () => {
    // primer caso: registrar
    it('Debe registar nuevo usuario válido', (done) => {
        chai.request(url)
            .post('/signup')
            .set({ 'Authorization': `jwt ${token}` })
            .send({
                name: 'Javiers fssssd',
                email: 'javiersfssssd@algo.com',
                password: '12345',
            })
            .end((error, response) => {
                //validar lo que se escribio
                expect(response).to.have.status(200);
                expect(response.body).to.have.property('user');
                expect(response.body).to.have.property('message');
                done();
            });
    });
    // segundo escenario
    it('Debe rechazar al momento de un campo faltante', (done) => {
        chai.request(url)
            .post('/signup')
            .set({ 'Authorization': `jwt ${token}` })
            .send({
                name: 'Javiers fssssd',
                email: 'javiersfssssd@algo.com',
            })
            .end((error, response) => {
                //validar lo que se escribio
                expect(response).to.have.status(400);
                expect(response.body).to.have.property('message');
                done();
            });
    });
});