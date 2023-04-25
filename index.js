
var texto
let eventos = datosAmazing.eventos
let fechaBase = datosAmazing.fechaActual
let textoHTML = document.getElementById("form")
let ulNombreEventos = document.getElementById("eventos")
let modalComentario = document.getElementById("modalComentario")
let arrayAFiltrar = []
var searchContainer = document.getElementById("searchContainer")
var inputSearch = document.getElementById("inputSearch")

let checkedCheckboxes = []
let search = ""

function ChangeTemplateLayaout() {

    switch (initialState.paginaANavegar) {

        case "EventosPasados":
            let eventosPasados = eventos.filter(evento => evento.date < fechaBase)
            arrayAFiltrar = eventosPasados
            searchContainer.style.display = "flex"
            inputSearch.value = ""
            checkedCheckboxes = []
            pintarHTML(eventosPasados)
            eventsCategories(eventosPasados)

            //console.log("Ocultar Contactos, estadisticas y Filtrar datosEventos donde los eventos sean menores a la fechaBase")
            break;
        case "EventosFuturos":
            let eventosFuturos = eventos.filter(evento => evento.date > fechaBase)
            arrayAFiltrar = eventosFuturos
            inputSearch.value = ""
            checkedCheckboxes = []
            searchContainer.style.display = "flex"
            pintarHTML(eventosFuturos)
            eventsCategories(eventosFuturos)

            //console.log("Ocultar Contactos, estadisticas y Filtrar datosEventos donde los eventos sean mayores a la fechaBase")
            break;
        case "Contactos":

            textoHTML.innerHTML =
                `
                <form action="">
                <div class="form_input">
                    <label for="email"><i class="fa-solid fa-user"></i></label>
                    <input type="email" name="email" placeholder="email@email.com" required>
                </div>
                <div class="form_input">
                    <label for="type"><i class="fa-solid fa-qrcode"></i></label>
                    <select id="type" name="type" >
                        <option value="Varios" selected>Varios</option>
                        <option value="Reclamo">Reclamo</option>
                        <option value="Sugerencia">Sugerencia</option>
                        <option value="Felicitaciones">Felicitaciones</option>
                    </select>
                </div>
                <div class="form_input">
                    <label for="date"><i class="fa-solid fa-calendar"></i></i></label>
                    <input type="date"id="date">
                </div>
                <div class="form_input">
                    <label for="comentario"><i class="fa-solid fa-comment"></i></label>
                    <textarea id="comentario" placeholder="Dejanos tu comentario"></textarea>
                </div>
        
                <div class="boton_form">
                    <input  class="boton_submit"  type="submit" value="Enviar!!!" data-bs-toggle="modal" data-bs-target="#exampleModal">
                </div>
            </form>
            `

            ulNombreEventos.innerHTML = ""
            searchContainer.style.display = "none"
            let form = document.querySelector("form")
            form.addEventListener("submit", function(event){actionForm(event)})
            //console.log("Ocultar las Cards o Estadisticas y va a mostrar el formulario de contactos")
            break;
        case "Estadisticas":
            texto = "Estas en la pagina de Estadistica"
            textoHTML.innerHTML = texto
            ulNombreEventos.innerHTML = ""
            searchContainer.style.display = "none"
            //console.log("Ocultar las Cards o Contactos y va a mostrar Tabla de estadisticas")
            break;
        default:
            setState("paginaANavegar", "Home")
            let InitAppStyle = document.getElementById("Home")
            InitAppStyle.style.backgroundColor = "pink"
            InitAppStyle.disabled = true
            inputSearch.value = ""
            checkedCheckboxes = []
            arrayAFiltrar = eventos
            searchContainer.style.display = "flex"
            pintarHTML(eventos)
            eventsCategories(eventos)

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


function pintarHTML(array) {

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



inputSearch.addEventListener("keyup", function (evento) {
    var datoInput = evento.target.value
    search = datoInput.trim().toLowerCase()
    filtrosCombinados()
})

//CREACION DINAMICA DE CHECKBOX POR CATEGORIA

function eventsCategories(array) {
    let categories = array.map(evento => evento.category)
    let unica = new Set(categories)
    let lastCategories = [...unica]

    let categoriasEventos = ""
    lastCategories.map(category =>
        categoriasEventos +=
        `
    <label><input type="checkbox" value="${category}"> ${category}</label>
    `
    )
    document.getElementById("checkcategories").innerHTML = categoriasEventos

    checkboxListener()
}

function checkboxListener() {
    //ESCUCHA Y GUARDADO DE CHECKBOX CHECKED
    // Por un selectorAll capturo las etiquetas input de tipo checkbox
    var checkboxs = document.querySelectorAll('input[type=checkbox')

    // creo un array vacio para poder guardar los datos de los checkbox con condicion checked true

    // recorro cada uno de los input checkbox y les aplico un escuchador de eventos change
    for (i = 0; i < checkboxs.length; i++) {
        checkboxs[i].addEventListener("change", function () {

            // limpio el array donde voy a guardar los input con checked true ya que utilizo un metodo push
            // caso contrario se van a agregar mas eventos
            checkedCheckboxes = []

            // recorro el array de checkbox para extrer aquellos cuyo atributo checked sea true
            for (i = 0; i < checkboxs.length; i++) {
                if (checkboxs[i].checked) {
                    // si se cumple la condicion de checked true los empujo al array que defini para almacenar
                    // los checkbox chequeados
                    checkedCheckboxes.push(checkboxs[i].value)
                }
            }
            console.log(checkedCheckboxes)
            filtrosCombinados()

        })

    }
}

function filtrosCombinados() {
    var filtrado = []
    if (search !== "" && checkedCheckboxes.length > 0) {

        checkedCheckboxes.map(category => filtrado.push(...arrayAFiltrar.filter(evento =>
            evento.name.toLowerCase().includes(search) && evento.category === category)
        ))
        
    }

    else if (search !== "" && checkedCheckboxes.length == 0) {
        filtrado = arrayAFiltrar.filter(evento => evento.name.toLowerCase().includes(search))
       
    }

    else if (search === "" && checkedCheckboxes.length > 0) {

        checkedCheckboxes.map(category =>
            filtrado.push(...arrayAFiltrar.filter(evento => evento.category === category))
        )

    }
    else {
        filtrado = arrayAFiltrar
       
    }

    filtrado.length > 0 ? 
    pintarHTML(filtrado) : 
    ulNombreEventos.innerHTML = `<h1 class="ceroResult" >No se encontraron eventos para tu busqueda </h1>`

}



 

          