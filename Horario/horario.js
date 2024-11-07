function Semestres() {
    var ciclo = document.getElementById('Ciclos').value;

    var contenidosCiclos = {
        '1': { contenido: '<h3>Contenido Ciclo 1</h3><p>CARGA HORARIA: 16 HRS</p>', filas: 16, columnas: 8 },
        '2': { contenido: '<h3>Contenido Ciclo 2</h3><p>CARGA HORARIA: 20 HRS</p>', filas: 5, columnas: 5 },
        '3': { contenido: '<h3>Contenido Ciclo 3</h3><p>CARGA HORARIA: 26 HRS</p>', filas: 3, columnas: 4 },
        '4': { contenido: '<h3>Contenido Ciclo 4</h3><p>CARGA HORARIA: 52 HRS</p>', filas: 2, columnas: 8 },
        '5': { contenido: '<h3>Contenido Ciclo 5</h3><p>CARGA HORARIA: 13 HRS</p>', filas: 5, columnas: 8 }
    };

    var contenidoDiv = document.getElementById('contenido-div');
    contenidoDiv.innerHTML = contenidosCiclos[ciclo].contenido;

    let tabla = Tabla(contenidosCiclos[ciclo].filas, contenidosCiclos[ciclo].columnas);
    contenidoDiv.appendChild(tabla);
}

function Tabla(filas, columnas) {
    let tabla = document.createElement("table");

    // Crear la fila de encabezado
    let encabezado = document.createElement("tr");
    let dias = ["Hora", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
    
    dias.forEach(dia => {
        let th = document.createElement("th");
        th.textContent = dia;
        encabezado.appendChild(th);
    });
    tabla.appendChild(encabezado);

    
    for (let i = 0; i < filas; i++) {
        let fila = document.createElement("tr");
            //#
            for (let j = 0; j < columnas; j++) {
                let celda = document.createElement("td");
                if (j === 0) {
                    celda.textContent = `${7 + i}-${8 + i}` ; 
                }
                fila.appendChild(celda);
            }
            //#
        tabla.appendChild(fila);
    }
    return tabla;
}