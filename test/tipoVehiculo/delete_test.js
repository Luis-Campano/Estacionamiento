const chai = require('chai');
const chaihttp = require('chai-http');
const expect = chai.expect;

chai.use(chaihttp);
const url = 'http://localhost:5000';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6InNhbmRyYTE5MDhoZXJuYW5kZXpAZ21haWwuY29tIiwicm9sIjoic3VwZXIifSwiaWF0IjoxNjU5ODEyOTk0LCJleHAiOjE2NjAwNzIxOTR9.fUW-999QCPa3XcCsKjLRFyb58URu3c-VgPYrqLaIQw4'

describe('Eliminar tipos de vehiculo', () => {

    describe('Eliminar un tipo de vehiculo ', () => {
        //primer escenario: leer un tipo de vehiculo valido
        it('Debe eliminar un tipo de vehiculo', (done) => {
            chai.request(url)
            .delete('/tipo_vehiculo/delete/1006')
            .set({'Authorization': `jwt ${token}`})
            .end((error, response) => {
                //validar lo que se escribio
                expect(response).to.have.status(200);
                expect(response.body).to.have.property('message')
                done();
            });
            
        });

        //segundo escenario
        it('Debe Mostrar el mensaje "Tipo de vehiculo no encontrado" cuando no se encuentre un tipo de vehiculo', (done) => {
            chai.request(url)
            .delete('/tipo_vehiculo/delete/1002')
            .set({'Authorization': `jwt ${token}`})
            .end((error, response) => {
                expect(response).to.have.status(404);
                expect(response.body).to.have.property('message');
                done();
            });
            
        });

        //tercer escenario
        it('Debe Mostrar "Error al eliminar el tipo de vehiculo" cuando no se especifique un numero de id', (done) => {
            chai.request(url)
            .delete('/tipo_vehiculo/delete/sf')
            .set({'Authorization': `jwt ${token}`})
            .end((error, response) => {
                expect(response).to.have.status(400);
                expect(response.body).to.have.property('message');
                done();
            });
            
        });
    });
});