const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);
const url = 'http://localhost:5000';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6ImFsZ29AYWxnby5jb20iLCJyb2wiOiJzdXBlciJ9LCJpYXQiOjE2NjA0MzcyNzcsImV4cCI6MTY2MDUyMzY3N30.qhSF7cSR9yRCuxYeNgP1LiNujgfuELTQHHsMENci8nA';

describe('Crear un usuario', () => {
    // primer caso: registrar
    it('Debe registar nuevo usuario válido', (done) => {
        chai.request(url)
            .post('/signup')
            .set({ 'Authorization': `jwt ${token}` })
            .send({
                name: 'Sefesesso',
                email: 'sefeesso@algo.com',
                password: 'sasnsr190118c',
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