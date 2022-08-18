const chai = require('chai');
const chaihttp = require('chai-http');
const expect = chai.expect;

chai.use(chaihttp);
const url = 'http://localhost:5000';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJlbWFpbCI6Imx1aXMuY2FtcGFuby5lc3BAZ21haWwuY29tIiwicm9sIjoic3VwZXIifSwiaWF0IjoxNjYwMDgzMzI1LCJleHAiOjE2NjAzNDI1MjV9.cPI-pERsBVa0FI0pAYVBUq5LPJW1HUVptBH8ZVpJfPI'

describe('Registro Planta', () => {

    describe('Registrar  de Planta', () => {
        //primer escenario: registrar un tipo de vehiculo valido
        it('Debe registrar una nueva planta valida', (done) => {
            chai.request(url)
            .post('/planta')
            .set({'Authorization': `jwt ${token}`})
            .send({
                name: 'baja',
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