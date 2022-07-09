const AccessControl = require('accesscontrol');

const ac = new AccessControl();

exports.roles = () => {
    //Roles para empleados.
    ac.grant('ninguno'); //SIN ROL
    
    //Empleados, Podra:
    //leer todo.
    //crear solo: Clientes, Vehículos(registro) y Registro(Entrada/Salida).
    //actualizar solo: Clientes, Vehículos(registro) y Registro(Entrada/Salida)
    ac.grant('employee')    
    .readAny(['customers', 'rates','floors', 'types','vehicles','registrations', 'payments'])
    .createAny(['customers','vehicles','registrations' ])
    .updateAny(['customers','vehicles','registrations']);

    //Administrador, podra:
    //crear solo: 'customers', 'rates','floors', 'types','vehicles','registrations', 'payments'
    //Actualizar: 'customers', 'rates', 'floors', 'types','vehicles','registrations', 'payments'
    ac.grant('admin')
        .extend('user')
        .readAny(['customers', 'rates','floors', 'types','vehicles','registrations', 'payments'])
        .createAny(['customers', 'rates','floors', 'types','vehicles','registrations', 'payments', 'users'])
        .updateAny(['customers', 'rates','floors', 'types','vehicles','registrations', 'payments', 'users']);


    //Administrador, podra:
    //Realizara lo mismo que admin. Ademas de:
    //Eliminar: TODO
    ac.grant('super')
        .extend('admin')
        .deleteAny(['customers', 'rates','floors', 'types','vehicles','registrations', 'payments','users']);

};