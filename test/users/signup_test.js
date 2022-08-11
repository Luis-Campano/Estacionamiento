const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);
const url = 'http://localhost:5000';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJlbWFpbCI6Imx1aXMuY2FtcGFuby5lc3BAZ21haWwuY29tIiwicm9sIjoic3VwZXIifSwiaWF0IjoxNjYwMDgzMzI1LCJleHAiOjE2NjAzNDI1MjV9.cPI-pERsBVa0FI0pAYVBUq5LPJW1HUVptBH8ZVpJfPI';

describe('Crear un usuario', () => {
    // primer caso: registrar
    it('Debe registar nuevo usuario válido', (done) => {
        chai.request(url)
            .post('/signup')
            .set({ 'Authorization': `jwt ${token}` })
            .send({
                name: 'SandraSa',
                email: 'salas19111@algo.com',
                password: 'sanr190118c',
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
                email: 'algo@algo.com',
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