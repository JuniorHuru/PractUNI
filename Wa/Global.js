const toggler = document.querySelector(".btn");
toggler.addEventListener("click",function(){
    document.querySelector("#sidebar").classList.toggle("collapsed");
})

// ocultar
function toggleSidebarOnResize() {
    const sidebar = document.querySelector("#sidebar");
    if (window.innerWidth <= 800) {
        sidebar.classList.add("collapsed"); 
    } else {
        sidebar.classList.remove("collapsed"); 
    }
}

toggleSidebarOnResize();

/* Escucha cambios en el tamaño de la ventana para aplicar el efecto
window.addEventListener("resize", toggleSidebarOnResize);*/
