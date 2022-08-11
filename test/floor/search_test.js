const chai = require('chai');
const chaihttp = require('chai-http');
const expect = chai.expect;

chai.use(chaihttp);
const url = 'http://localhost:5000';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJlbWFpbCI6Imx1aXMuY2FtcGFuby5lc3BAZ21haWwuY29tIiwicm9sIjoic3VwZXIifSwiaWF0IjoxNjYwMDgzMzI1LCJleHAiOjE2NjAzNDI1MjV9.cPI-pERsBVa0FI0pAYVBUq5LPJW1HUVptBH8ZVpJfPI'

describe('Buscar Planta', () => {

    describe('Buscar una planta ', () => {
        //primer escenario: leer un tipo de vehiculo valido
        it('Debe Buscar una planta', (done) => {
            chai.request(url)
            .get('/plantas/search?q=a')
            .set({'Authorization': `jwt ${token}`})
            .end((error, response) => {
                //validar lo que se escribio
                expect(response).to.have.status(200);
                done();
            });
            
        });

        //segundo escenario
        it('Debe Mostrar el mensaje "Sin resultados." cuando no se encuentre una planta', (done) => {
            chai.request(url)
            .get('/plantas/search?q=y')
            .set({'Authorization': `jwt ${token}`})
            .end((error, response) => {
                expect(response).to.have.status(404);
                expect(response.body).to.have.property('message');
                done();
            });
        });

        //tercer escenario
        it('Mostrar error cuando la ruta de busqueda sea incorrecta', (done) => {
            chai.request(url)
                .get('/plantas/search?=y')
                .set({ 'Authorization': `jwt ${token}` })
                .end((error, response) => {
                    //validar lo que se escribio
                    expect(response).to.have.status(400);
                    expect(response.body).to.have.property('message');
                    done();
                });
        });
    });
});