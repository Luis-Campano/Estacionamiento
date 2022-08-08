const chai = require('chai');
const chaihttp = require('chai-http');
const expect = chai.expect;

chai.use(chaihttp);
const url = 'http://localhost:5000';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6InNhbmRyYTE5MDhoZXJuYW5kZXpAZ21haWwuY29tIiwicm9sIjoic3VwZXIifSwiaWF0IjoxNjU5NjcyNDQ5LCJleHAiOjE2NTk5MzE2NDl9.w-V8tGnPxBqC-c6Pw75NwZUQpR4ZMvIstuPPv8BCtj0'

describe('Registro de Tipo de vehiculo', () => {

    describe('Registrar un vehiculo', () => {
        //primer escenario: registrar un tipo de vehiculo valido
        it('Debe registrar un nuevo tipo de vehiculo valido', (done) => {
            chai.request(url)
            .post('/tipo_vehiculo')
            .set({'Authorization': `jwt ${token}`})
            .send({
                typeVehicle: 'carro',
                floorId: 1,
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