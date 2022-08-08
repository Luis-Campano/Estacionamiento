const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);
const url = 'http://localhost:5000';

// bloque de autenticar usuario
describe('Autenticar usuario', () => {
    // primer escenario
    it('Debe autenticar un usuario válido', (done) => {
        chai.request(url)
            .post('/login')
            .send({
                 email: 'algo@algo.com',
                 password: '12345'
            })
            .end((error, response) => {
                //validar lo que se escribio
                expect(response).to.have.status(200);
                expect(response.body).to.have.property('token');
                done();
            });
    });
    // segundo escenario
    it('Debe rechazar autenticar usuario válido', (done) => {
        chai.request(url)
            .post('/login')
            .send({
                email: 'algo@algo.com',
                password: '123456',
            })
            .end((error, response) => {
                //validar lo que se escribio
                expect(response).to.have.status(400);
                expect(response.body).to.have.property('error');
                expect(response.body).to.have.property('message');
                done();
            });
    });
});