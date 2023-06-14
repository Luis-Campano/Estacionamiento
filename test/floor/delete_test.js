const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
require('dotenv').config();

chai.use(chaiHttp);
const url = process.env.URL_ACCESS;
const token = process.env.TOKEN_ACCESS;

describe('Eliminar planta', () => {

    describe('Eliminar una planta ', () => {
        //primer escenario: 
        it('Debe eliminar una planta', (done) => {
            chai.request(url)
            .delete('/planta/delete/74')
            .set({'Authorization': `jwt ${token}`})
            .end((error, response) => {
                //validar lo que se escribio
                expect(response).to.have.status(200);
                expect(response.body).to.have.property('message')
                done();
            });
            
        });

        //segundo escenario
        it('Debe Mostrar el mensaje "planta no encontrado" cuando no se encuentre una planta', (done) => {
            chai.request(url)
            .delete('/planta/delete/2000')
            .set({'Authorization': `jwt ${token}`})
            .end((error, response) => {
                expect(response).to.have.status(404);
                expect(response.body).to.have.property('message');
                done();
            });
            
        });

        //tercer escenario
        it('Debe Mostrar "Error al eliminar la planta" cuando no se especifique un numero de id', (done) => {
            chai.request(url)
            .delete('/planta/delete/a')
            .set({'Authorization': `jwt ${token}`})
            .end((error, response) => {
                expect(response).to.have.status(404);
                expect(response.body).to.have.property('message');
                done();
            });
            
        });
    });
});