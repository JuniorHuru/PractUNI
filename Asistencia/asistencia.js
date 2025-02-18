function actualizarReloj() {
    const ahora = new Date();
    const opciones = {
      timeZone: "America/Lima",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    };
    const horaPeruana = ahora.toLocaleTimeString("es-PE", opciones);
    document.getElementById("reloj").textContent = horaPeruana;
  }
  setInterval(actualizarReloj, 1000);
  actualizarReloj();
 

  document.addEventListener("DOMContentLoaded", function () {
    cargarSemestres();
    cargarMeses();
    cargarDatos();
});

let paginaActual = 1;
const elementosPorPagina = 10;
let datosFiltrados = [];

async function cargarDatos() {
    const response = await fetch("asistencia.json");
    let data = await response.json();

    // Obtener valores seleccionados de los filtros
    const semestreSeleccionado = document.getElementById("Semestre").value;
    const mesSeleccionado = document.getElementById("Mes").value;

    // Filtrar datos solo si no se seleccionó "Todos"
    if (semestreSeleccionado !== "Todos") {
        data = data.filter(item => item.semestre.toString() === semestreSeleccionado);
    }
    if (mesSeleccionado !== "Todos") {
        data = data.filter(item => new Date(item.fecha).getMonth() + 1 === parseInt(mesSeleccionado));
    }

    // Ordenar por fecha ascendente
    data.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

    // Guardamos los datos filtrados y actualizamos la tabla con la primera página
    datosFiltrados = data;
    paginaActual = 1;
    mostrarPagina(paginaActual);
    generarPaginacion();
}

function mostrarPagina(pagina) {
    const tbody = document.querySelector("#tablaAsistencia tbody");
    tbody.innerHTML = "";

    const inicio = (pagina - 1) * elementosPorPagina;
    const fin = inicio + elementosPorPagina;
    const datosPagina = datosFiltrados.slice(inicio, fin);

    datosPagina.forEach((item, index) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${inicio + index + 1}</td>
            <td>${formatearFecha(item.fecha)}</td>
            <td>${item.codCurso}</td>
            <td>${item.horEntrada} - ${item.horSalida}</td>
            <td>${item.teopra}</td>
        `;
        tbody.appendChild(fila);
    });
}

function generarPaginacion() {
    const paginacion = document.getElementById("paginacion");
    paginacion.innerHTML = "";

    const totalPaginas = Math.ceil(datosFiltrados.length / elementosPorPagina);

    for (let i = 1; i <= totalPaginas; i++) {
        const li = document.createElement("li");
        li.classList.add("page-item");
        if (i === paginaActual) {
            li.classList.add("active");
        }

        const link = document.createElement("a");
        link.classList.add("page-link");
        link.href = "#";
        link.textContent = i;
        link.addEventListener("click", (e) => {
            e.preventDefault();
            paginaActual = i;
            mostrarPagina(paginaActual);
            generarPaginacion();
        });

        li.appendChild(link);
        paginacion.appendChild(li);
    }
}

function cargarSemestres() {
    const selectSemestre = document.getElementById("Semestre");
    selectSemestre.innerHTML = ""; // Limpiamos el select antes de cargar los datos

    const semestres = ["Todos", 20241, 20242, 20243, 20244];

    semestres.forEach(semestre => {
        const option = document.createElement("option");
        option.value = semestre === "Todos" ? "Todos" : semestre.toString();
        option.textContent = semestre;
        selectSemestre.appendChild(option);
    });

    selectSemestre.addEventListener("change", cargarDatos);
}

function cargarMeses() {
    const selectMes = document.getElementById("Mes");
    selectMes.innerHTML = ""; // Limpiamos el select antes de cargar los datos

    const meses = ["Todos", 
        "01 (Enero)", "02 (Febrero)", "03 (Marzo)", "04 (Abril)", "05 (Mayo)", "06 (Junio)",
        "07 (Julio)", "08 (Agosto)", "09 (Septiembre)", "10 (Octubre)", "11 (Noviembre)", "12 (Diciembre)"
    ];

    meses.forEach((mes, index) => {
        const option = document.createElement("option");
        option.value = index === 0 ? "Todos" : (index).toString().padStart(2, "0");
        option.textContent = mes;
        selectMes.appendChild(option);
    });

    selectMes.addEventListener("change", cargarDatos);
}

function formatearFecha(fecha) {
    const opciones = { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' };
    const fechaObjeto = new Date(fecha);
    let fechaFormateada = fechaObjeto.toLocaleDateString('es-ES', opciones)
        .replace(",", "")
        .replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$1/$2/$3");

    // Capitalizar solo la primera letra del día
    return fechaFormateada.charAt(0).toUpperCase() + fechaFormateada.slice(1);
}

  let registros = JSON.parse(localStorage.getItem('asistencia')) || [];
  let registrosPorPagina = 10;
  
  document.getElementById('marcarBtn').addEventListener('click', function() {
    const ahora = new Date();
    const horaActual = ahora.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const dia = ahora.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: '2-digit', year: 'numeric' });
    const cursoSeleccionado = document.getElementById('curso').value;
  
    if (registros.length > 0 && !registros[0].salida) {
      registros[0].salida = horaActual;
    } else {
      const horas = ahora.getHours();
      const minutos = ahora.getMinutes();
      const estado = (horas < 8 || (horas === 8 && minutos === 0)) ? 'P' : 'T';
  
      registros.unshift({ // Agrega al inicio del array
        nro: 1, // Siempre será 1
        dia: dia.charAt(0).toUpperCase() + dia.slice(1),
        curso: cursoSeleccionado,
        entrada: horaActual,
        salida: null,
        estado: estado
      });
    }
  
    guardarDatos();
    actualizarPaginacion();
    mostrarRegistros();
  });
  
  function mostrarRegistros() {
    const tabla = document.getElementById('tablaAsistencia').getElementsByTagName('tbody')[0];
    tabla.innerHTML = "";
    
    let inicio = (paginaActual - 1) * registrosPorPagina;
    let fin = inicio + registrosPorPagina;
    let registrosPagina = registros.slice(inicio, fin);
  
    registrosPagina.forEach((registro, index) => {
      const nuevaFila = tabla.insertRow();
      nuevaFila.insertCell(0).innerText = inicio + index + 1; // Renumerar dinámicamente
      nuevaFila.insertCell(1).innerText = registro.dia;
      nuevaFila.insertCell(2).innerText = registro.curso;
      nuevaFila.insertCell(3).innerText = registro.entrada + (registro.salida ? " - " + registro.salida : "");
      nuevaFila.insertCell(4).innerText = registro.estado;
    });
  }
  
  function actualizarPaginacion() {
    const totalPaginas = Math.ceil(registros.length / registrosPorPagina);
    const paginacion = document.getElementById('paginacion');
    paginacion.innerHTML = "";
  
    if (totalPaginas > 1) {
      let prev = document.createElement("li");
      prev.className = "page-item" + (paginaActual === 1 ? " disabled" : "");
      prev.innerHTML = `<a class="page-link" href="#" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a>`;
      prev.onclick = () => cambiarPagina(paginaActual - 1);
      paginacion.appendChild(prev);
    }
  
    for (let i = 1; i <= totalPaginas; i++) {
      let item = document.createElement("li");
      item.className = "page-item" + (i === paginaActual ? " active" : "");
      item.innerHTML = `<a class="page-link" href="#">${i}</a>`;
      item.onclick = () => cambiarPagina(i);
      paginacion.appendChild(item);
    }
  
    if (totalPaginas > 1) {
      let next = document.createElement("li");
      next.className = "page-item" + (paginaActual === totalPaginas ? " disabled" : "");
      next.innerHTML = `<a class="page-link" href="#" aria-label="Next"><span aria-hidden="true">&raquo;</span></a>`;
      next.onclick = () => cambiarPagina(paginaActual + 1);
      paginacion.appendChild(next);
    }
  }
  
  function cambiarPagina(nuevaPagina) {
    const totalPaginas = Math.ceil(registros.length / registrosPorPagina);
    if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
      paginaActual = nuevaPagina;
      mostrarRegistros();
      actualizarPaginacion();
    }
  }
  
  document.getElementById('borrarTodo').addEventListener('click', function() {
    registros = [];
    localStorage.removeItem('asistencia');
    mostrarRegistros();
    actualizarPaginacion();
  });
  
  function guardarDatos() {
    localStorage.setItem('asistencia', JSON.stringify(registros));
  }
  
  window.addEventListener('load', function() {
    actualizarPaginacion();
    mostrarRegistros();
  });
  