function initStats() {
    console.log(eventos)

    // Obtenemos las categorias unicas
    var categorias = []

    var unique = eventos.map(evento => evento.category)
    const quitoRepetidas = new Set(unique)
    categorias = [...quitoRepetidas]

    console.log(categorias)

    //Agrupamos los eventos por categorias
    var porCategoria = []

    categorias.forEach(categoria => {
        porCategoria.push(
            {
                categoria: categoria,
                data: eventos.filter(evento => evento.category === categoria)
            }
        )
    })
    console.log(porCategoria)
    // Obtenemos datos de ingresos y asistencias o estimaciones por categoria

    var ingresoYassitencia = []

    porCategoria.map(datos => {
        ingresoYassitencia.push({
            categoria: datos.categoria,
            ingreso: datos.data.map(item => item.assistance ? item.assistance * item.price : 0),
            estimacionIngreso: datos.data.map(item => item.estimate ? item.estimate * item.price : 0),
            asistencia: datos.data.map(item => item.assistance ? item.assistance : 0),
            estimacionAsistencia: datos.data.map(item => item.estimate ? item.estimate : 0),
            capacidad: datos.data.map(item => item.capacity ? item.capacity : 0)
        })
    })
    //console.log(ingresoYassitencia)

    // Sumo los datos generados en arrays en el paso anterior
    ingresoYassitencia.forEach(categoria => {

        //Calculo capacidades y asistencias para poder obtener los porcentajes necesarios 

        let totalAsistencia = 0
        let totalAsistenciaEstimada = 0
        let totalCapacidadPasados = 0
        let totalCapacidadFuturos = 0

        for (var i = 0; i < categoria.ingreso.length; i++) {

            //POr la estructura de datos si posee ingreso es un ecento pasado y mediante esta verificacion obtengo datos de asistencia y capcidad
            if (categoria.ingreso[i] > 0) {
                totalCapacidadPasados += categoria.capacidad[i]
                totalAsistencia += categoria.asistencia[i]
                categoria.totalCapacidadPasados = totalCapacidadPasados
                categoria.totalAsistencia = totalAsistencia
                // si no posee ingresos posee estimaciones y se trata de eventos futuros y mediante esto obtengo datos de estimaciones 
            } else {
                totalCapacidadFuturos += categoria.capacidad[i]
                totalAsistenciaEstimada += categoria.estimacionAsistencia[i]
                categoria.totalCapacidadFuturos = totalCapacidadFuturos
                categoria.totalAsistenciaEstimada = totalAsistenciaEstimada
            }
        }
        categoria.porcentajeDeAsistencia = "%" + (totalAsistencia * 100) / totalCapacidadPasados
        categoria.porcentajeDeEstimacion = "%" + (totalAsistenciaEstimada * 100) / totalCapacidadFuturos

        //Calculo el total de ingresos (PASADOS)
        let totalIngreso = 0
        categoria.ingreso.map(ingresos => totalIngreso += ingresos)
        categoria.ingresos = totalIngreso

        //Calculo el total de estimacion de Ingresos (FUTUROS)
        let totalIngresoEstimado = 0
        categoria.estimacionIngreso.map(ingresosEstimados => totalIngresoEstimado += ingresosEstimados)
        categoria.estimacionIngresos = totalIngresoEstimado

    })

    console.log(ingresoYassitencia)

}

