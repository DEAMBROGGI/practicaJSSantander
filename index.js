
var datosEventos //Contener el array con todos los eventos
var fechaBase //Es la fecha establecida en el archivo JSON
var texto

function ChangeTemplateLayaout() {

    switch (initialState.paginaANavegar) {

        case "EventosPasados":
            texto = "Estas en la pagina de Eventos Pasados"
            //console.log("Ocultar Contactos, estadisticas y Filtrar datosEventos donde los eventos sean menores a la fechaBase")
            break;
        case "EventosFuturos":
            texto = "Estas en la pagina de Eventos Futuros"
            //console.log("Ocultar Contactos, estadisticas y Filtrar datosEventos donde los eventos sean mayores a la fechaBase")
            break;
        case "Contactos":
            texto = "Estas en la pagina de Contactos"
            //console.log("Ocultar las Cards o Estadisticas y va a mostrar el formulario de contactos")
            break;
        case "Estadisticas":
            texto = "Estas en la pagina de Estadistica"
            //console.log("Ocultar las Cards o Contactos y va a mostrar Tabla de estadisticas")
            break;
        default:
            setState("paginaANavegar", "Home")
            let InitAppStyle = document.getElementById("Home")
            InitAppStyle.style.backgroundColor = "pink"
            InitAppStyle.disabled = true

            texto = "Estas en la pagina HOME"
        //console.log("Ocultar Contactos, estadisticas y Mostrar toda la info de datosEventos = todos los eventos")
    }

    document.getElementById("Pagina").innerHTML = texto
}

ChangeTemplateLayaout()

var buttons = document.getElementsByClassName("button")
for (let index = 0; index < buttons.length; index++) {
    const element = buttons[index];

    element.addEventListener("click", (e) => {
        setState("paginaANavegar", e.target.id)
        for (let index = 0; index < buttons.length; index++) {
            const elementos = buttons[index];
            if (elementos.id !== e.target.id) {
                elementos.disabled = false
                elementos.style.backgroundColor = "deeppink"
            } else {
                element.disabled = true;
                element.style.backgroundColor = "pink"
            }
        }
        ChangeTemplateLayaout()
    })

}


