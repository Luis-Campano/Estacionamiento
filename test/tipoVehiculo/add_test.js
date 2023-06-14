const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
require('dotenv').config();

chai.use(chaiHttp);
const url = process.env.URL_ACCESS;
const token = process.env.TOKEN_ACCESS;

describe('Registro de Tipo de vehiculo', () => {

    describe('Registrar un vehiculo', () => {
        //primer escenario: registrar un tipo de vehiculo valido
        it('Debe registrar un nuevo tipo de vehiculo valido', (done) => {
            chai.request(url)
            .post('/tipo_vehiculo')
            .set({'Authorization': `jwt ${token}`})
            .send({
                typeVehicle: 'sport',
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