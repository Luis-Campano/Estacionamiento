const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
require('dotenv').config();

chai.use(chaiHttp);
const url = process.env.URL_ACCESS;
const token = process.env.TOKEN_ACCESS;

describe('Registro Planta', () => {

    describe('Registrar  de Planta', () => {
        //primer escenario: registrar un tipo de vehiculo valido
        it('Debe registrar una nueva planta valida', (done) => {
            chai.request(url)
            .post('/planta')
            .set({'Authorization': `jwt ${token}`})
            .send({
                name: 'Alta',
                rateId: 4,
            })
            .end((error, response) => {
                //validar lo que se escribio
                expect(response).to.have.status(200);
                expect(response.body).to.have.property('floor');
                expect(response.body).to.have.property('message');
                done();
            });
            
        });

        //segundo escenario
        it('Debe mostrar error al registrar una planta con datos incorrectos', (done) => {
            chai.request(url)
            .post('/planta')
            .set({'Authorization': `jwt ${token}`})
            .send({
                name: 'baja15',
                rateId: 4,
            })
            .end((error, response) => {
                //validar lo que se escribio
                expect(response).to.have.status(400);
                expect(response.body).to.have.property('error');
                expect(response.body).to.have.property('message');
                done();
            })
        });

         // tercer escenario
            it('Debe mostrar error al registrar una planta con datos faltantes', (done) => {
            chai.request(url)
            .post('/planta')
            .set({'Authorization': `jwt ${token}`})
            .send({
                name: '',
                rateId: 4,
            })
            .end((error, response) => {
                //validar lo que se escribio
                expect(response).to.have.status(400);
                expect(response.body).to.have.property('error');
                expect(response.body).to.have.property('message');
                done();
            })
        });
    });
});