const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
require('dotenv').config();

chai.use(chaiHttp);
const url = process.env.URL_ACCESS;
const token = process.env.TOKEN_ACCESS;

describe('Crear un usuario', () => {
    // primer caso: registrar
    it('Debe registar nuevo usuario válido', (done) => {
        chai.request(url)
            .post('/signup')
            .set({ 'Authorization': `jwt ${token}` })
            .send({
                name: 'Motasss',
                email: 'motasssss@algo.com',
                password: 'mosstasr190118c',
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
                email: 'motas@algo.com',
                password: 'agfdsasdfg'
            })
            .end((error, response) => {
                //validar lo que se escribio
                expect(response).to.have.status(400);
                expect(response.body).to.have.property('message');
                done();
            });
    });
    // tercer escenario
    it('Debe rechazar al momento de ingresar datos incorrectos', (done) => {
        chai.request(url)
            .post('/signup')
            .set({ 'Authorization': `jwt ${token}` })
            .send({
                name: '12345676',
                email: 'javiersfssssd@algo',
                password: 'a'
            })
            .end((error, response) => {
                //validar lo que se escribio
                expect(response).to.have.status(400);
                expect(response.body).to.have.property('message');
                done();
            });
    });
});