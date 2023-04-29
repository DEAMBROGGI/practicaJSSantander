var data;
  
  var datosseleccionados = []
  var continents;
  
 async function getData(){
 await fetch("https://restcountries.com/v3.1/all")
     .then(response => response.json())
     .then(json => data = json)
     
    console.log(data)
    //BUSCAR CONTINENTES Y ELIMINAR REPETIDOS
     var unique = data.map(pais=>pais.continents[0] )
     const dataArray = new Set(unique)
     continents =[...dataArray]
     console.log(continents)
    // FILTRAR POR CONTINENTES


     var searchContinent=data.filter(pais => pais.continents.includes("South America"));
     console.log(searchContinent)
     searchContinent.map(pais =>{
     datosseleccionados.push(
        
        {name : pais.name.common,
        capital:pais.capital !== undefined ? pais.capital[0]:"Sin datos sobre capital",
        continent:pais.continents[0],
        currency:pais.currencies[Object.keys(pais.currencies)[0]].name,
        poblacion:pais.population,
        bandera:pais.flags.svg,
        area: pais.area
        }
    
     );
})
document.getElementById("imprimirARRAY").innerHTML = JSON.stringify(datosseleccionados,undefined,2) //Mostrar en html
console.log(datosseleccionados)
     
      }
      getData()



