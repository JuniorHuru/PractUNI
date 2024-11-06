function Semestres() {
    var ciclo = document.getElementById('Ciclos').value;

    // Define los contenidos y las dimensiones de la tabla para cada ciclo
    var contenidosCiclos = {
        '1': { contenido: '<h3>Contenido Ciclo 1</h3><p>CARGA HORARIA: 16 HRS</p>', filas: 16, columnas: 8 },
        '2': { contenido: '<div style="background-color: #ffcc00;"><h3>Contenido Ciclo 2</h3><p>CARGA HORARIA: 18 HRS</p></div>', filas: 5, columnas: 5 },
        '3': { contenido: '<div style="background-color: #ff6600;"><h3>Contenido Ciclo 3</h3><p>CARGA HORARIA: 20 HRS</p></div>', filas: 3, columnas: 4 },
        '4': { contenido: '<div style="background-color: #00ccff;"><h3>Contenido Ciclo 4</h3><p>CARGA HORARIA: 22 HRS</p></div>', filas: 2, columnas: 9 },
        '5': { contenido: '<div style="background-color: #9900cc;"><h3>Contenido Ciclo 5</h3><p>CARGA HORARIA: 24 HRS</p></div>', filas: 5, columnas: 8 }
    };

    var contenidoDiv = document.getElementById('contenido-div');
    contenidoDiv.innerHTML = contenidosCiclos[ciclo].contenido;

    // Crea la tabla según las dimensiones definidas para el ciclo
    let tabla = Tabla(contenidosCiclos[ciclo].filas, contenidosCiclos[ciclo].columnas);
    contenidoDiv.appendChild(tabla);
}

function Tabla(filas, columnas) {
    let tabla = document.createElement("table");

    // Crear la fila de encabezado
    let encabezado = document.createElement("tr");
    let diasSemana = ["Hora", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
    
    diasSemana.forEach(dia => {
        let th = document.createElement("th");
        th.textContent = dia;
        encabezado.appendChild(th);
    });
    tabla.appendChild(encabezado);

    // Generar las filas y columnas para las horas
    for (let i = 0; i < filas; i++) {
        let fila = document.createElement("tr");

        for (let j = 0; j < columnas; j++) {
            let celda = document.createElement("td");

            // Si es la primera columna de cada fila, establece un horario en formato de texto
            if (j === 0) {
                celda.textContent = `${8 + i}:00`; // Genera horas comenzando desde las 8:00
            }
            
            fila.appendChild(celda);
        }
        tabla.appendChild(fila);
    }
    return tabla;
}
