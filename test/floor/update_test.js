const chai = require('chai');
const chaihttp = require('chai-http');
const expect = chai.expect;
require('dotenv').config();

chai.use(chaiHttp);
const url = process.env.URL_ACCESS;
const token = process.env.TOKEN_ACCESS;

describe('Actualizacion de planta', () => {

    describe('Actualizar una planta', () => {
        //primer escenario
        it('Debe actualizar una planta valida', (done) => {
            chai.request(url)
            .put('/planta/update/2')
            .set({'Authorization': `jwt ${token}`})
            .send({
                name: 'alta'
            })
            .end((error, response) => {
                //validar lo que se escribio
                expect(response).to.have.status(200);
                expect(response.body).to.have.property('message');
                done();
            });
            
        });

        // Segundo escenario
        it('Debe mostrar error al actualizar una planta invalido', (done) => {
            chai.request(url)
            .put('/planta/update/1003')
            .set({'Authorization': `jwt ${token}`})
            .send({
                name: '',
            })
            .end((error, response) => {
                //validar lo que se escribio
                expect(response).to.have.status(400);
                expect(response.body).to.have.property('error');
                expect(response.body).to.have.property('message');
                done();
            });
            
        });

        //tercer escenario
        it('Debe mostrar error cuando se ingresen datos incorrectos', (done) => {
            chai.request(url)
            .put('/planta/update/1003')
            .set({'Authorization': `jwt ${token}`})
            .send({
                name: '1245'
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
});