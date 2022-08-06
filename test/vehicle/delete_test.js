const chai = require('chai');
const chaiHttp = require('chai-http');
const vehicle = require('../../models/vehicle');
const expect = chai.expect;

chai.use(chaiHttp);
const url = 'http://localhost:5000';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJlbWFpbCI6Imx1aXMuY2FtcGFuby5lc3BAZ21haWwuY29tIiwicm9sIjoic3VwZXIifSwiaWF0IjoxNjU5ODA4MTI5LCJleHAiOjE2NjAwNjczMjl9.Um_y6qoM331vq6lpAXXghK2DQvBJPhEBhhYqa8buUZ0'
// bloque de Eliminar Vehículo
describe('Vehicle', () => {
    // primer escenario
    it('Eliminar un vehículo válido', (done) => {
        chai.request(url)
            .delete('/vehiculo/delete/3')
            .set({ 'Authorization': `jwt ${token}` })
            .end((error, response) => {
                //validar lo que se escribio
                expect(response).to.have.status(200);
                expect(response.body).to.have.property('message');
                done();
            });
    });

    // segundo escenario
    it('Error al eliminar un vehiculo no existente', (done) => {
        chai.request(url)
            .delete('/vehiculo/delete/1000')
            .set({ 'Authorization': `jwt ${token}` })
            .end((error, response) => {
                //validar lo que se escribio
                expect(response).to.have.status(404);
                expect(response.body).to.have.property('message');
                done();
            });
    });

    // tercer escenario
    it('Error al querer eliminar un vehículo y no agregar id', (done) => {
        chai.request(url)
            .delete('/vehiculo/delete/a')
            .set({ 'Authorization': `jwt ${token}` })
            .end((error, response) => {
                //validar lo que se escribio
                expect(response).to.have.status(500);
                expect(response.body).to.have.property('message');
                done();
            });
    });
});