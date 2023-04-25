//Metodos Number
var numeroUno = "12.637"
var numeroDos = 3
var numbers = [2,7,9,17,28,2,7, 28, 1, 132, 569]

console.log(Number(numeroUno).toFixed(1))

console.log((Number(numeroUno) + numeroDos).toFixed(2))

var quitorepetidos = new Set(numbers)
var newArray = [...quitorepetidos]
console.log(numbers)
console.log(newArray)

let orderDes = new Array(...newArray.sort((a,b)=>{return b-a}))
console.log("ORDEN DES",orderDes)
let ordenAsc = new Array(...newArray.sort((a,b)=>{return a-b}))
console.log("ORDEN ASC",ordenAsc)
console.log("TRES MAYORES",orderDes.splice(0,3))
console.log("TRES MENORES",ordenAsc.splice(0,3))
console.log("SOLO MAXIMO", Math.max(...numbers))
console.log("SOLO MINIMO", Math.min(...numbers))

//Date

var nacimiento =  new Date("04/11/1983")
console.log(nacimiento)
var today = new Date("04/30/2023")
console.log(today)
var calculo = today - nacimiento
console.log(calculo)

var años = today.getFullYear() - nacimiento.getFullYear()
var meses = today.getMonth() - nacimiento.getMonth()
var dias = today.getDate() - nacimiento.getDate()
console.log("AÑOS CON METODO", años)
console.log("MESES CON METODOS", meses)
console.log ("DIAS CON METODOS", dias)


var diasSemana = ["Domingo","Lunes", "Martes", "Miercoles","Jueves","Viernes","Sabado"]
console.log(diasSemana[today.getDay()])
console.log("transcurrieron "+ años+ "años y ")

var now = Date.now()
console.log( new Date(now).toLocaleString())
