const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
require('dotenv').config();

chai.use(chaiHttp);
const url = process.env.URL_ACCESS;
const token = process.env.TOKEN_ACCESS;

describe('Buscar Planta', () => {

    describe('Buscar una planta ', () => {
        //primer escenario: leer un tipo de vehiculo valido
        it('Debe Buscar una planta', (done) => {
            chai.request(url)
            .get('/plantas/search?q=altaa')
            .set({'Authorization': `jwt ${token}`})
            .end((error, response) => {
                //validar lo que se escribio
                expect(response).to.have.status(200);
                done();
            });
            
        });

        //segundo escenario
        it('Debe Mostrar el mensaje "Sin resultados." cuando no se encuentre una planta', (done) => {
            chai.request(url)
            .get('/plantas/search?q=y')
            .set({'Authorization': `jwt ${token}`})
            .end((error, response) => {
                expect(response).to.have.status(404);
                expect(response.body).to.have.property('message');
                done();
            });
        });

        //tercer escenario
        it('Mostrar error cuando la ruta de busqueda sea incorrecta', (done) => {
            chai.request(url)
                .get('/plantas/search?=y')
                .set({ 'Authorization': `jwt ${token}` })
                .end((error, response) => {
                    //validar lo que se escribio
                    expect(response).to.have.status(400);
                    expect(response.body).to.have.property('message');
                    done();
                });
        });
    });
});