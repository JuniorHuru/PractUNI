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
 


  let datosGlobales = []; 
  let elementosPorPagina = 10; 
  
  async function cargarFiltros() {
      try {
          const response = await fetch('asistencia.json');
          if (!response.ok) throw new Error('Error al cargar el archivo JSON');
          const datos = await response.json();
          datosGlobales = datos;
  
          // Llenar semestres únicos
          const semestresUnicos = [...new Set(datos.map(dato => dato.semestre))];
          const selectSemestre = document.getElementById('Semestre');
          semestresUnicos.forEach(semestre => {
              const option = document.createElement('option');
              option.value = semestre;
              option.textContent = semestre;
              selectSemestre.appendChild(option);
          });
  
          selectSemestre.addEventListener('change', (event) => {
              const semestreSeleccionado = event.target.value;
              const mesesFiltrados = obtenerMesesPorSemestre(datos, semestreSeleccionado);
              cargarMeses(mesesFiltrados);
              actualizarTablaConPaginacion(datos, semestreSeleccionado, null, 1); 
          });
  
          const primerSemestre = semestresUnicos[0];
          const mesesFiltrados = obtenerMesesPorSemestre(datos, primerSemestre);
          cargarMeses(mesesFiltrados);
          actualizarTablaConPaginacion(datos, primerSemestre, null, 1); 
      } catch (error) {
          console.error('Error:', error);
      }
  }
  
  function obtenerMesesPorSemestre(datos, semestreSeleccionado) {
      const datosSemestre = datos.filter(dato => dato.semestre == semestreSeleccionado);
      const mesesUnicos = [...new Set(datosSemestre.map(dato => {
          const fecha = new Date(dato.fecha);
          return fecha.getMonth();
      }))];
      return mesesUnicos;
  }
  
  function cargarMeses(mesesFiltrados) {
      const selectMes = document.getElementById('Mes');
      selectMes.innerHTML = '<option selected hidden>Elegir Mes</option>'; 
  
      const nombresMeses = [
          'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
          'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
      ];
  
      mesesFiltrados.sort((a, b) => a - b).forEach(mes => {
          const option = document.createElement('option');
          option.value = mes;
          option.textContent = nombresMeses[mes];
          selectMes.appendChild(option);
      });
  
      selectMes.addEventListener('change', (event) => {
          const semestreSeleccionado = document.getElementById('Semestre').value;
          const mesSeleccionado = event.target.value;
          actualizarTablaConPaginacion(datosGlobales, semestreSeleccionado, mesSeleccionado, 1); 
      });
  }

  function actualizarTablaConPaginacion(datos, semestreSeleccionado, mesSeleccionado, paginaActual) {
      const tbody = document.querySelector("#tabla-asistencia tbody");
      tbody.innerHTML = ""; 
  
      let datosFiltrados = datos;
  
      if (semestreSeleccionado) {
          datosFiltrados = datosFiltrados.filter(dato => dato.semestre == semestreSeleccionado);
      }
  
      if (mesSeleccionado !== null && mesSeleccionado !== undefined) {
          datosFiltrados = datosFiltrados.filter(dato => {
              const fecha = new Date(dato.fecha);
              return fecha.getMonth() == mesSeleccionado;
          });
      }
  
      const inicio = (paginaActual - 1) * elementosPorPagina;
      const fin = inicio + elementosPorPagina;
      const datosPaginados = datosFiltrados.slice(inicio, fin);
  
      datosPaginados.forEach(dato => {
          const diaFormateado = formatearFecha(dato.fecha);
          const horaEntrada = dato.horEntrada.substring(0, 5); 
          const horaSalida = dato.horSalida.substring(0, 5);   
  
          const fila = document.createElement("tr");
          fila.innerHTML = `
              <td>${diaFormateado}</td>
              <td>${dato.codCurso}-${dato.secCurso} (${dato.teopra})</td>
              <td>${dato.hora}</td>
              <td>${horaEntrada} - ${horaSalida}</td>
              <td>${dato.estado}</td>
          `;
          tbody.appendChild(fila);
      });

      actualizarPaginacion(datosFiltrados.length, paginaActual);
  }
  
  function actualizarPaginacion(totalElementos, paginaActual) {
      const paginacion = document.querySelector(".pagination");
      paginacion.innerHTML = "";
  
      const totalPaginas = Math.ceil(totalElementos / elementosPorPagina);
  
      const anterior = document.createElement("li");
      anterior.className = "page-item";
      anterior.innerHTML = `
          <a class="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
          </a>`;
      if (paginaActual === 1) anterior.classList.add("disabled");
      anterior.addEventListener("click", () => {
          if (paginaActual > 1) {
              actualizarTablaConPaginacion(datosGlobales, null, null, paginaActual - 1);
          }
      });
      paginacion.appendChild(anterior);

      for (let i = 1; i <= totalPaginas; i++) {
          const pagina = document.createElement("li");
          pagina.className = `page-item ${i === paginaActual ? "active" : ""}`;
          pagina.innerHTML = `<a class="page-link" href="#">${i}</a>`;
          pagina.addEventListener("click", () => {
              actualizarTablaConPaginacion(datosGlobales, null, null, i);
          });
          paginacion.appendChild(pagina);
      }
  
      const siguiente = document.createElement("li");
      siguiente.className = "page-item";
      siguiente.innerHTML = `
          <a class="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
          </a>`;
      if (paginaActual === totalPaginas) siguiente.classList.add("disabled");
      siguiente.addEventListener("click", () => {
          if (paginaActual < totalPaginas) {
              actualizarTablaConPaginacion(datosGlobales, null, null, paginaActual + 1);
          }
      });
      paginacion.appendChild(siguiente);
  }
  
  function formatearFecha(fechaISO) {
      const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
      const fecha = new Date(fechaISO);
      const diaSemana = diasSemana[fecha.getDay()];
      const diaMes = fecha.getDate();
      return `${diaSemana} ${diaMes}`;
  }
  
  window.onload = cargarFiltros;
  