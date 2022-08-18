const chai = require('chai');
const chaihttp = require('chai-http');
const expect = chai.expect;
require('dotenv').config();

chai.use(chaiHttp);
const url = process.env.URL_ACCESS;
const token = process.env.TOKEN_ACCESS;

describe('Leer planta', () => {

    describe('leer una planta', () => {
        //primer escenario
        it('Debe leer una planta valida', (done) => {
            chai.request(url)
            .get('/planta/2')
            .set({'Authorization': `jwt ${token}`})
            .end((error, response) => {
                //validar lo que se escribio
                expect(response).to.have.status(200);
                done();
            });
            
        });

        // Segundo escenario
        it('Debe mostrar mensaje de error al leer una planta que no existe', (done) => {
            chai.request(url)
            .get('/planta/2000')
            .set({'Authorization': `jwt ${token}`})
            .end((error, response) => {
                //validar lo que se escribio
                expect(response).to.have.status(404);
                expect(response.body).to.have.property('message');
                done();
            });
            
        });

        //tercer escenario
        it('Debe mostrar error cuando no se especifique un id de planta', (done) => {
            chai.request(url)
            .put('/planta/')
            .set({'Authorization': `jwt ${token}`})
            .end((error, response) => {
                //validar lo que se escribio
                expect(response).to.have.status(404);
                done();
            });
            
        }); 
    });
});