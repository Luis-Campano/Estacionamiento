const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
require('dotenv').config();

chai.use(chaiHttp);
const url = process.env.URL_ACCESS;
const token = process.env.TOKEN_ACCESS;

describe('Leer los tipos de vehiculo', () => {

    describe('Leer un tipo de vehiculo ', () => {
        //primer escenario: leer un tipo de vehiculo valido
        it('Debe leer un tipo de vehiculo valido', (done) => {
            chai.request(url)
            .get('/tipo_vehiculo/show/1')
            .set({'Authorization': `jwt ${token}`})
            .end((error, response) => {
                //validar lo que se escribio
                expect(response).to.have.status(200)
                expect(response.body).to.have.property('id');
                expect(response.body).to.have.property('typeVehicle');
                expect(response.body).to.have.property('floorId');
                done();
            });
            
        });

        // Segundo escenario
        it('Debe mostrar mensaje de error al leer un tipo de vehiculo que no existe', (done) => {
            chai.request(url)
            .get('/tipo_vehiculo/show/1050')
            .set({'Authorization': `jwt ${token}`})
            .end((error, response) => {
                //validar lo que se escribio
                expect(response).to.have.status(404);
                expect(response.body).to.have.property('message');
                done();
            });
            
        });

         //tercer escenario
            it('Debe mostrar error cuando no se especifique un id de tipos de vehiculo', (done) => {
            chai.request(url)
            .put('/tipo_vehiculo/')
            .set({'Authorization': `jwt ${token}`})
            .end((error, response) => {
                //validar lo que se escribio
                expect(response).to.have.status(404);
                done();
            });
            
        }); 
    });
});