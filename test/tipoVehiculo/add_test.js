const chai = require('chai');
const chaihttp = require('chai-http');
const expect = chai.expect;

chai.use(chaihttp);
const url = 'http://localhost:5000';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJlbWFpbCI6Imx1aXMuY2FtcGFuby5lc3BAZ21haWwuY29tIiwicm9sIjoic3VwZXIifSwiaWF0IjoxNjYwMDgzMzI1LCJleHAiOjE2NjAzNDI1MjV9.cPI-pERsBVa0FI0pAYVBUq5LPJW1HUVptBH8ZVpJfPI'

describe('Registro de Tipo de vehiculo', () => {

    describe('Registrar un vehiculo', () => {
        //primer escenario: registrar un tipo de vehiculo valido
        it('Debe registrar un nuevo tipo de vehiculo valido', (done) => {
            chai.request(url)
            .post('/tipo_vehiculo')
            .set({'Authorization': `jwt ${token}`})
            .send({
                typeVehicle: 'carro',
                floorId: 2,
            })
            .end((error, response) => {
                //validar lo que se escribio
                expect(response).to.have.status(200);
                expect(response.body).to.have.property('type');
                expect(response.body).to.have.property('message');
                done();
            });
            
        });

        //segundo escenario
        it('Debe mostrar error al registrar un nuevo tipo de vehiculo con datos incorrectos', (done) => {
            chai.request(url)
            .post('/tipo_vehiculo')
            .set({'Authorization': `jwt ${token}`})
            .send({
                typeVehicle: 'carro25',
                floorId: 1,
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
        it('Debe mostrar error al registrar un nuevo tipo de vehiculo con datos faltantes', (done) => {
            chai.request(url)
            .post('/tipo_vehiculo')
            .set({'Authorization': `jwt ${token}`})
            .send({
                typeVehicle: 'carro25',
                floorId: ''
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