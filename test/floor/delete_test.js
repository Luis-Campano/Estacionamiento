const chai = require('chai');
const chaihttp = require('chai-http');
const expect = chai.expect;

chai.use(chaihttp);
const url = 'http://localhost:5000';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6InNhbmRyYTE5MDhoZXJuYW5kZXpAZ21haWwuY29tIiwicm9sIjoic3VwZXIifSwiaWF0IjoxNjU5ODEyOTk0LCJleHAiOjE2NjAwNzIxOTR9.fUW-999QCPa3XcCsKjLRFyb58URu3c-VgPYrqLaIQw4'

describe('Eliminar planta', () => {

    describe('Eliminar una planta ', () => {
        //primer escenario: 
        it('Debe eliminar una planta', (done) => {
            chai.request(url)
            .delete('/planta/delete/1005')
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
                expect(response).to.have.status(400);
                expect(response.body).to.have.property('message');
                done();
            });
            
        });
    });
});