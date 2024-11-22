function actualizarReloj() {
    // Crear una nueva instancia de fecha en UTC
    const ahora = new Date();

    // Convertir la hora a la zona horaria de Perú (UTC-5)
    const opciones = {
      timeZone: "America/Lima",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false, // Formato 24 horas
    };

    // Obtener la hora formateada para Perú
    const horaPeruana = ahora.toLocaleTimeString("es-PE", opciones);

    // Mostrar la hora en el elemento del reloj
    document.getElementById("reloj").textContent = horaPeruana;
  }

  // Actualizar el reloj cada segundo
  setInterval(actualizarReloj, 1000);

  // Inicializar el reloj
  actualizarReloj();