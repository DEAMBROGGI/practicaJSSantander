
var texto
let eventos = datosAmazing.eventos
let fechaBase = datosAmazing.fechaActual
let textoHTML = document.getElementById("form")
let ulNombreEventos = document.getElementById("eventos")

function ChangeTemplateLayaout() {

    switch (initialState.paginaANavegar) {

        case "EventosPasados":
            let eventosPasados = eventos.filter(evento =>  evento.date < fechaBase)
            pintarHTML(eventosPasados)
            //console.log("Ocultar Contactos, estadisticas y Filtrar datosEventos donde los eventos sean menores a la fechaBase")
            break;
        case "EventosFuturos":
            let eventosFuturos = eventos.filter(evento =>  evento.date > fechaBase)
            pintarHTML(eventosFuturos)
            //console.log("Ocultar Contactos, estadisticas y Filtrar datosEventos donde los eventos sean mayores a la fechaBase")
            break;
        case "Contactos":
             
            textoHTML.innerHTML = 
            `
            <form action="">
            <div class="form_input">
            <label for="email"><i class="fa-solid fa-user"></i></label>
            <input type="email" name="email" placeholder="email@email.com">
            </div>
            <div class="form_input">
            <label for="pass"><i class="fa-solid fa-lock"></i></label>
            <input type="password" name="password" placeholder="Password">
            </div>
            </form>
            `
            ulNombreEventos.innerHTML =""
            //console.log("Ocultar las Cards o Estadisticas y va a mostrar el formulario de contactos")
            break;
        case "Estadisticas":
            texto = "Estas en la pagina de Estadistica"
            textoHTML.innerHTML = texto
            ulNombreEventos.innerHTML = ""
            //console.log("Ocultar las Cards o Contactos y va a mostrar Tabla de estadisticas")
            break;
        default:
            setState("paginaANavegar", "Home")
            let InitAppStyle = document.getElementById("Home")
            InitAppStyle.style.backgroundColor = "pink"
            InitAppStyle.disabled = true

            pintarHTML(eventos)
        //console.log("Ocultar Contactos, estadisticas y Mostrar toda la info de datosEventos = todos los eventos")
    }

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

}   //comentario de test


function pintarHTML(array){
    
    let nombreEventosHTML = ""
    array.map(evento =>
        nombreEventosHTML +=
        `
        <div class="item">
        <img src="./Imagenes/${evento.image}" alt="${evento.name}">
        <p class="titulo_dos">${evento.name}</p>
        <div class="detalles">
          <p class="precio">Precio: $${evento.price}</p>
          <p class="boton_d"><a href="./Pages/Detalles.html?id=${evento.id}">Detalles</a></p>
        </div>
      </div>
        `
    )
    ulNombreEventos.innerHTML = nombreEventosHTML
    textoHTML.innerHTML = ""
}