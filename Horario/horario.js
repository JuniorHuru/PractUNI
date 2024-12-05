document.getElementById('opciones').addEventListener('change', function () {
    const semestreSeleccionado = parseInt(this.value);
    fetch('horarios.json')
        .then(response => response.json())
        .then(data => {
            const tabla = document.getElementById('tabla');
            tabla.innerHTML = ''; 
            crearTabla(data, semestreSeleccionado);
        })
        .catch(error => console.error('Error al cargar el JSON:', error));
});

function crearTabla(data, semestreSeleccionado) {
    const dias = ["Hora", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
    const horas = Array.from({ length: 16 }, (_, i) => `${7 + i}-${8 + i}`);
    const tabla = document.getElementById('tabla');
    const encabezado = tabla.insertRow();
    dias.forEach(dia => {
        const th = document.createElement('th');
        th.textContent = dia;
        encabezado.appendChild(th);
        
    });

    const datosFiltrados = data.filter(item => item.semestre === semestreSeleccionado);
    const ocupadas = Array.from({ length: 16 }, () => Array(8).fill(false));

    horas.forEach((hora, filaIndex) => {
        const fila = tabla.insertRow();
        for (let colIndex = 0; colIndex < 8; colIndex++) {
            if (colIndex === 0) {
                const celda = fila.insertCell();
                celda.textContent = hora;
                celda.classList.add('hora-columna');
            } else if (!ocupadas[filaIndex][colIndex]) {
                const item = datosFiltrados.find(d => {
                    const [inicio, fin] = d.hora.split('-').map(h => parseInt(h));
                    return d.dia === dias[colIndex] && inicio - 7 === filaIndex;
                });

                if (item) {
                    const celda = fila.insertCell();
                    const [inicio, fin] = item.hora.split('-').map(h => parseInt(h));
                    celda.textContent = `(${item.id}) ${item.codCurso}-${item.secCurso}-${item.teopra}`;
                    celda.rowSpan = fin - inicio;
                    for (let i = filaIndex; i < filaIndex + (fin - inicio); i++) {
                        ocupadas[i][colIndex] = true;
                    }
                } else {
                    fila.insertCell();
                }
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    fetch('horarios.json')
        .then(response => response.json())
        .then(data => {
            const semestresUnicos = [...new Set(data.map(item => item.semestre))];
            const selectElement = document.getElementById('opciones');
            semestresUnicos.forEach(semestre => {
                const option = document.createElement('option');
                option.value = semestre;
                option.textContent = semestre;
                selectElement.appendChild(option);
            });
        })
        .catch(error => console.error('Error al cargar el JSON:', error));
});
