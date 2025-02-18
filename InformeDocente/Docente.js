document.addEventListener('DOMContentLoaded', function () {
    let storedData = localStorage.getItem('personas');
    let personas = storedData ? JSON.parse(storedData) : [];

    if (personas.length > 0) {
        let persona = personas[personas.length - 1]; // Último registro guardado

        // Cargar valores en los campos
        document.getElementById('floatingDNI').value = persona.dni || '';
        document.getElementById('floatingDate').value = persona.fecha || '';
        document.getElementById('floatingCelular').value = persona.celular || '';
        document.getElementById('floatingTelefono').value = persona.telefono || '';
        document.getElementById('floatingSelectGender').value = persona.genero || '';
        document.getElementById('floatingSelectBlood').value = persona.sangre || '';
        document.getElementById('floatingSelectCivil').value = persona.civil || '';
        document.getElementById('floatingRUC').value = persona.ruc || '';
        document.getElementById('floatingEmail1').value = persona.email1 || '';
        document.getElementById('floatingEmail2').value = persona.email2 || '';
        document.getElementById('floatingSelectCountry').value = persona.pais || '';
        document.getElementById('floatingSelectDepartment').value = persona.departamento || '';
        document.getElementById('floatingProvincia').value = persona.provincia || '';
        document.getElementById('floatingDistrito').value = persona.distrito || '';
    }
});

document.getElementById('editButton').addEventListener('click', function () {
    let fields = document.querySelectorAll('input, select');
    let isDisabled = fields[0].disabled;
    let icon = document.getElementById('iconEye');

    if (isDisabled) {
        fields.forEach(field => field.disabled = false);
        icon.innerHTML = `<path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z"/>
                        <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z"/>`;
    } else {
        let storedData = localStorage.getItem('personas');
        let personas = storedData ? JSON.parse(storedData) : [];

        let persona = {
            dni: document.getElementById('floatingDNI').value,
            fecha: document.getElementById('floatingDate').value,
            celular: document.getElementById('floatingCelular').value,
            telefono: document.getElementById('floatingTelefono').value,
            genero: document.getElementById('floatingSelectGender').value,
            sangre: document.getElementById('floatingSelectBlood').value,
            civil: document.getElementById('floatingSelectCivil').value,
            ruc: document.getElementById('floatingRUC').value,
            email1: document.getElementById('floatingEmail1').value,
            email2: document.getElementById('floatingEmail2').value,
            pais: document.getElementById('floatingSelectCountry').value,
            departamento: document.getElementById('floatingSelectDepartment').value,
            provincia: document.getElementById('floatingProvincia').value,
            distrito: document.getElementById('floatingDistrito').value
        };

        // Agregar persona al array y guardar en localStorage
        personas.push(persona);
        localStorage.setItem('personas', JSON.stringify(personas));

        fields.forEach(field => field.disabled = true);
        icon.innerHTML = `<path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
                        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>`;
    }
});

document.getElementById('deleteButton').addEventListener('click', function () {
    localStorage.removeItem('personas');

    document.querySelectorAll('input, select').forEach(field => {
        if (field.tagName === 'INPUT') {
            field.value = '';
        } else if (field.tagName === 'SELECT') {
            field.selectedIndex = 0;
        }
    });

    alert('Todos los datos han sido eliminados.');
});


function cargarDomicilios() {
    const datos = JSON.parse(localStorage.getItem('domicilios')) || [];
    const tabla = document.getElementById('tablaDomicilio').querySelector('tbody');
    tabla.innerHTML = '';
    datos.forEach((domicilio, index) => {
        const fila = `<tr>
                        <td>${index + 1}</td>
                        <td>${domicilio.pais}</td>
                        <td>${domicilio.departamento}</td>
                        <td>${domicilio.provincia}</td>
                        <td>${domicilio.distrito}</td>
                        <td>${domicilio.nombreZona}</td>
                        <td>${domicilio.tipoVia}</td>
                        <td>${domicilio.inmueble}</td>
                    </tr>`;
        tabla.innerHTML += fila;
    });
}

function guardarDomicilio(index) {
    const datos = JSON.parse(localStorage.getItem('domicilios')) || [];
    const domicilio = {
        pais: document.getElementById('selectPais').value,
        departamento: document.getElementById('selectDepartamento').value,
        provincia: document.getElementById('selectProvincia').value,
        distrito: document.getElementById('selectDistrito').value,
        nombreZona: document.getElementById('inputNombreZona').value,
        tipoVia: document.getElementById('inputTipoVia').value,
        inmueble: document.getElementById('inputInmueble').value
    };
    datos[index] = domicilio;
    localStorage.setItem('domicilios', JSON.stringify(datos));
    cargarDomicilios();
    document.getElementById('modalDomicilio').querySelector('.btn-close').click();
}

document.getElementById('guardarDomicilio1').addEventListener('click', () => guardarDomicilio(0));
document.getElementById('guardarDomicilio2').addEventListener('click', () => guardarDomicilio(1));

function cargarFamiliares() {
    const datos = JSON.parse(localStorage.getItem('familiares')) || [];
    console.log("Cargando familiares:", datos);

    const tabla = document.getElementById('tablaFamiliares').querySelector('tbody');
    tabla.innerHTML = ''; // Limpiar tabla

    // Solo mostrar los registros 1 y 2 (índices 0 y 1)
    const familiaresAMostrar = datos.slice(0, 2);

    familiaresAMostrar.forEach((familiar, index) => {
        const fila = `<tr>
                        <td>${index + 1}</td>
                        <td>${familiar.apellidosNombres}</td>
                        <td>${familiar.fechaNacimiento}</td>
                        <td>${familiar.parentesco}</td>
                        <td>${familiar.nivelEstudios}</td>
                        <td>${familiar.estadoCivil}</td>
                        <td>${familiar.dependeEconomicamente ? 'Sí' : 'No'}</td>
                    </tr>`;
        tabla.innerHTML += fila;
    });
}

function guardarFamiliar(index) {
    let datos = JSON.parse(localStorage.getItem('familiares')) || [];

    // Asegurar que el array tenga al menos 2 posiciones
    while (datos.length < 2) {
        datos.push({});
    }

    // Guardar o actualizar el registro en la posición específica
    datos[index] = {
        apellidosNombres: document.getElementById('inputApellidosNombres').value,
        fechaNacimiento: document.getElementById('inputFechaNacimiento').value,
        parentesco: document.getElementById('selectParentesco').value,
        nivelEstudios: document.getElementById('selectNivelEstudios').value,
        estadoCivil: document.getElementById('selectEstadoCivil').value,
        dependeEconomicamente: document.getElementById('checkboxDependeEconomicamente').checked
    };

    // Guardar solo los dos primeros registros en localStorage
    localStorage.setItem('familiares', JSON.stringify(datos.slice(0, 2)));

    cargarFamiliares();
    document.getElementById('modalFamiliar').querySelector('.btn-close').click();
}

// Asignar funciones a los botones
document.getElementById('guardarFamiliar').addEventListener('click', () => guardarFamiliar(0)); // Siempre en posición 1
document.getElementById('guardarFamiliar2').addEventListener('click', () => guardarFamiliar(1)); // Siempre en posición 2

// Cargar datos al iniciar la página
window.onload = cargarFamiliares;

// Cargar los datos cuando se abra la página
window.onload = function () {
    cargarDomicilios();
    cargarFamiliares();
};

console.table(JSON.parse(localStorage.getItem('domicilios')));
console.table(JSON.parse(localStorage.getItem('familiares')));
console.table(JSON.parse(localStorage.getItem('persona')));
console.log(JSON.parse(localStorage.getItem('personas')));

