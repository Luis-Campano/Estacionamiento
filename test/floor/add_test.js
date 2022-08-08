const chai = require('chai');
const chaihttp = require('chai-http');
const expect = chai.expect;

chai.use(chaihttp);
const url = 'http://localhost:5000';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6InNhbmRyYTE5MDhoZXJuYW5kZXpAZ21haWwuY29tIiwicm9sIjoic3VwZXIifSwiaWF0IjoxNjU5ODEyOTk0LCJleHAiOjE2NjAwNzIxOTR9.fUW-999QCPa3XcCsKjLRFyb58URu3c-VgPYrqLaIQw4'

describe('Registro Planta', () => {

    describe('Registrar  de Planta', () => {
        //primer escenario: registrar un tipo de vehiculo valido
        it('Debe registrar una nueva planta valida', (done) => {
            chai.request(url)
            .post('/planta')
            .set({'Authorization': `jwt ${token}`})
            .send({
                name: 'baja',
                rateId: 3,
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
                rateId: 1,
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
                rateId: 1,
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