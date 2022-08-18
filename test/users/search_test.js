const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);
const url = 'http://localhost:5000';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6ImFsZ29AYWxnby5jb20iLCJyb2wiOiJzdXBlciJ9LCJpYXQiOjE2NjA0MDAwMjQsImV4cCI6MTY2MDQ4NjQyNH0.vHr0CR-nL0vufP8hUDljlGnHn9I-u_kpA8-Te9HNwFk';

// bloque de Buscar Usuario
describe('Registro Búscar', () => {
    //primer escenario
    it('Buscar un usuario existente.', (done) => {
        chai.request(url)
            .get('/search-user?q=Juan')
            .set({ 'Authorization': `jwt ${token}` })
            .end((error, response) => {
                //validar lo que se escribio
                expect(response).to.have.status(200);
                done();
            });
    });

    //segundo escenario
    it('Mostrar el mensaje "Sin resultados" cuando no se encuentre un usuario.', (done) => {
        chai.request(url)
            .get('/search-user?q=w')
            .set({ 'Authorization': `jwt ${token}` })
            .end((error, response) => {
                //validar lo que se escribio
                expect(response).to.have.status(404);
                expect(response.body).to.have.property('message');
                done();
            });
    });

    //tecer escenario
    it('Mostrar error cuando la ruta de busqueda sea incorrecta', (done) => {
        chai.request(url)
            .get('/search-user?=juan')
            .set({ 'Authorization': `jwt ${token}` })
            .end((error, response) => {
                //validar lo que se escribio
                expect(response).to.have.status(500);
                expect(response.body).to.have.property('message');
                done();
            });
    });
});