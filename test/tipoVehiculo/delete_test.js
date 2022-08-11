const chai = require('chai');
const chaihttp = require('chai-http');
const expect = chai.expect;

chai.use(chaihttp);
const url = 'http://localhost:5000';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJlbWFpbCI6Imx1aXMuY2FtcGFuby5lc3BAZ21haWwuY29tIiwicm9sIjoic3VwZXIifSwiaWF0IjoxNjYwMDgzMzI1LCJleHAiOjE2NjAzNDI1MjV9.cPI-pERsBVa0FI0pAYVBUq5LPJW1HUVptBH8ZVpJfPI'

describe('Eliminar tipos de vehiculo', () => {

    describe('Eliminar un tipo de vehiculo ', () => {
        //primer escenario: leer un tipo de vehiculo valido
        it('Debe eliminar un tipo de vehiculo', (done) => {
            chai.request(url)
            .delete('/tipo_vehiculo/delete/2')
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