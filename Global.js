const toggler = document.querySelector(".btn");
toggler.addEventListener("click",function(){
    document.querySelector("#sidebar").classList.toggle("collapsed");
})

// ocultar el sidebar auto
function toggleSidebarOnResize() {
    const sidebar = document.querySelector("#sidebar");
    if (window.innerWidth <= 800) {
        sidebar.classList.add("collapsed"); // Añade la clase si es menor a 600px
    } else {
        sidebar.classList.remove("collapsed"); // Remueve la clase si es mayor a 600px
    }
}

// Ejecutar al cargar
toggleSidebarOnResize();

/* Escucha cambios en el tamaño de la ventana para aplicar el efecto
window.addEventListener("resize", toggleSidebarOnResize);*/
