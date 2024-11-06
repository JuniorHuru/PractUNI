document.addEventListener("DOMContentLoaded", function () {
    const toggleButton = document.getElementById("toggleButton");
    const offcanvasElement = new bootstrap.Offcanvas(document.getElementById("offcanvasTop"));
    const sidebarToggler = document.querySelector("#toggleButton"); // Asegúrate de tener un botón específico para el sidebar

    toggleButton.addEventListener("click", function () {
      // Solo muestra el offcanvas si el ancho es menor a 900px
      if (window.innerWidth <= 820) {
        offcanvasElement.show();
      }
    });

    sidebarToggler.addEventListener("click", function () {
      // Solo colapsa el sidebar si el ancho es mayor a 901px
      if (window.innerWidth >= 821) {
        document.querySelector("#sidebar").classList.toggle("collapsed");
      }
    });
});

function toggleSidebarOnResize() {
    const sidebar = document.querySelector("#sidebar");
    if (window.innerWidth <= 820) {
        sidebar.classList.add("collapsed"); // Añade la clase si es menor 
    } else {
        sidebar.classList.remove("collapsed"); // Remueve la clase si es mayor 
    }
}
toggleSidebarOnResize();
window.addEventListener("resize", toggleSidebarOnResize);

document.getElementById("toggleButton").addEventListener("click", function() {
    const sourceContent = document.getElementById("Lateral").innerHTML;
    document.getElementById("Arriba").innerHTML = sourceContent;
});