const chai = require('chai');
const chaihttp = require('chai-http');
const expect = chai.expect;
require('dotenv').config();

chai.use(chaiHttp);
const url = process.env.URL_ACCESS;
const token = process.env.TOKEN_ACCESS;

describe('Buscar tipos de vehiculo', () => {

    describe('Buscar un tipo de vehiculo ', () => {
        //primer escenario: leer un tipo de vehiculo valido
        it('Debe Buscar un tipo de vehiculo', (done) => {
            chai.request(url)
            .get('/tipos_vehiculos/search?q=c')
            .set({'Authorization': `jwt ${token}`})
            .end((error, response) => {
                //validar lo que se escribio
                expect(response).to.have.status(200);
                done();
            });
            
        });

        //segundo escenario
        it('Debe Mostrar el mensaje "Sin resultados." cuando no se encuentre un tipo de vehiculo', (done) => {
            chai.request(url)
            .get('/tipos_vehiculos/search?q=y')
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
                .get('/tipos_vehiculos/search?=y')
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