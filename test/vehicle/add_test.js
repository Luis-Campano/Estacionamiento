const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);
const url = 'http://localhost:5000';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyLCJlbWFpbCI6InJvYmVydG8ubHVpcy5jYW1wYW5vQGdtYWlsLmNvbSIsInJvbCI6ImFkbWluIn0sImlhdCI6MTY1OTY1MTc4MCwiZXhwIjoxNjU5OTEwOTgwfQ.P0MLQUfV3U6w9C86e9CEdKJw9OtSE-2mXgYUGnGzlP4';

// bloque de Agregar Vehículo
describe('Vehicle', () => {
    // primer escenario
    it('Agregar un nuevo vehículo', (done) => {
        chai.request(url)
            .post('/vehiculo')
            .set({ 'Authorization': `jwt ${token}` })
            .send({
                lincesPlate: 'Abcdf19',
                brand: 'Rolls Royce',
                model: 'Phantom Orchid',
                color: 'White',
                customerId: 2,
                typeVehicleId: 1
            })
            .end((error, response) => {
                //validar lo que se escribio
                expect(response).to.have.status(200);
                expect(response.body).to.have.property('vehicle');
                expect(response.body).to.have.property('message');
                done();
            });
    });

    // segundo escenario
    it('Error al agregar un nuevo vehículo con datos faltantes', (done) => {
        chai.request(url)
            .post('/vehiculo')
            .set({ 'Authorization': `jwt ${token}` })
            .send({
                lincesPlate: '',
                brand: 'Rolls Royce',
                model: 'Phantom Orchid',
                color: '',
                customerId: 2,
                typeVehicleId: 1
            })
            .end((error, response) => {
                //validar lo que se escribio
                expect(response).to.have.status(500);
                expect(response.body).to.have.property('error');
                expect(response.body).to.have.property('message');
                done();
            });
    });

    // tercer escenario
    it('Error al agregar un nuevo vehículo con datos incorrectos', (done) => {
        chai.request(url)
            .post('/vehiculo')
            .set({ 'Authorization': `jwt ${token}` })
            .send({
                lincesPlate: '*******a//////-----',
                brand: 'Rolls Royce',
                model: 'Phantom Orchid',
                color: 'White',
                customerId: 2,
                typeVehicleId: 1
            })
            .end((error, response) => {
                //validar lo que se escribio
                expect(response).to.have.status(500);
                expect(response.body).to.have.property('error');
                expect(response.body).to.have.property('message');
                done();
            });
    });
});