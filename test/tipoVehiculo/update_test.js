const chai = require('chai');
const chaihttp = require('chai-http');
const expect = chai.expect;

chai.use(chaihttp);
const url = 'http://localhost:5000';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6InNhbmRyYTE5MDhoZXJuYW5kZXpAZ21haWwuY29tIiwicm9sIjoic3VwZXIifSwiaWF0IjoxNjU5NjcyNDQ5LCJleHAiOjE2NTk5MzE2NDl9.w-V8tGnPxBqC-c6Pw75NwZUQpR4ZMvIstuPPv8BCtj0'

describe('Actualizacion de Tipo de vehiculo', () => {

    describe('Actualizar un tipo de vehiculo', () => {
        //primer escenario:actualizar un tipo de vehiculo valido
        it('Debe actualizar un tipo de vehiculo valido', (done) => {
            chai.request(url)
            .put('/tipo_vehiculo/update/1001')
            .set({'Authorization': `jwt ${token}`})
            .send({
                typeVehicle: 'motoneta',
                floorId: 1,
            })
            .end((error, response) => {
                //validar lo que se escribio
                expect(response).to.have.status(200);
                expect(response.body).to.have.property('message');
                done();
            });
            
        });

        // Segundo escenario
        it('Debe mostrar error al actualizar un tipo de vehiculo invalido', (done) => {
            chai.request(url)
            .put('/tipo_vehiculo/update/1002')
            .set({'Authorization': `jwt ${token}`})
            .send({
                typeVehicle: '',
                floorId: '1',
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
            .put('/tipo_vehiculo/update/1002')
            .set({'Authorization': `jwt ${token}`})
            .send({
                typeVehicle: 'motoneta40',
                floorId: '1',
            })
            .end((error, response) => {
                //validar lo que se escribio
                expect(response).to.have.status(400);
                expect(response.body).to.have.property('error');
                expect(response.body).to.have.property('message');
                done();
            });
            
        });
    })
});