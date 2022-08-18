const chai = require('chai');
const chaihttp = require('chai-http');
const expect = chai.expect;

chai.use(chaihttp);
const url = 'http://localhost:5000';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJlbWFpbCI6Imx1aXMuY2FtcGFuby5lc3BAZ21haWwuY29tIiwicm9sIjoic3VwZXIifSwiaWF0IjoxNjYwMDgzMzI1LCJleHAiOjE2NjAzNDI1MjV9.cPI-pERsBVa0FI0pAYVBUq5LPJW1HUVptBH8ZVpJfPI'

describe('Leer los tipos de vehiculo', () => {

    describe('Leer un tipo de vehiculo ', () => {
        //primer escenario: leer un tipo de vehiculo valido
        it('Debe leer un tipo de vehiculo valido', (done) => {
            chai.request(url)
            .get('/tipo_vehiculo/show/3')
            .set({'Authorization': `jwt ${token}`})
            .end((error, response) => {
                //validar lo que se escribio
                expect(response).to.have.status(200)
                expect(response.body).to.have.property('id');
                expect(response.body).to.have.property('typeVehicle');
                expect(response.body).to.have.property('floorId');
                done();
            });
            
        });

        // Segundo escenario
        it('Debe mostrar mensaje de error al leer un tipo de vehiculo que no existe', (done) => {
            chai.request(url)
            .get('/tipo_vehiculo/show/1050')
            .set({'Authorization': `jwt ${token}`})
            .end((error, response) => {
                //validar lo que se escribio
                expect(response).to.have.status(404);
                expect(response.body).to.have.property('message');
                done();
            });
            
        });

         //tercer escenario
            it('Debe mostrar error cuando no se especifique un id de tipos de vehiculo', (done) => {
            chai.request(url)
            .put('/tipo_vehiculo/')
            .set({'Authorization': `jwt ${token}`})
            .end((error, response) => {
                //validar lo que se escribio
                expect(response).to.have.status(404);
                done();
            });
            
        }); 
    });
});