const chai = require('chai');
const chaihttp = require('chai-http');
const expect = chai.expect;

chai.use(chaihttp);
const url = 'http://localhost:5000';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6InNhbmRyYTE5MDhoZXJuYW5kZXpAZ21haWwuY29tIiwicm9sIjoic3VwZXIifSwiaWF0IjoxNjU5NjcyNDQ5LCJleHAiOjE2NTk5MzE2NDl9.w-V8tGnPxBqC-c6Pw75NwZUQpR4ZMvIstuPPv8BCtj0'

describe('Leer planta', () => {

    describe('leer una planta', () => {
        //primer escenario
        it('Debe leer una planta valida', (done) => {
            chai.request(url)
            .get('/planta/1')
            .set({'Authorization': `jwt ${token}`})
            .end((error, response) => {
                //validar lo que se escribio
                expect(response).to.have.status(200);
                done();
            });
            
        });

        // Segundo escenario
        it('Debe mostrar mensaje de error al leer una planta que no existe', (done) => {
            chai.request(url)
            .get('/planta/2000')
            .set({'Authorization': `jwt ${token}`})
            .end((error, response) => {
                //validar lo que se escribio
                expect(response).to.have.status(404);
                expect(response.body).to.have.property('message');
                done();
            });
            
        });

        //tercer escenario
        it('Debe mostrar error cuando no se especifique un id de planta', (done) => {
            chai.request(url)
            .put('/planta/')
            .set({'Authorization': `jwt ${token}`})
            .end((error, response) => {
                //validar lo que se escribio
                expect(response).to.have.status(404);
                done();
            });
            
        }); 
    });
});