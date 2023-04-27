

let productos = [
  { id: 1, nombre: "Arroz Chow Fan",        categoria: "arroz",       cantidad: 1,  descripcion: "Delicioso plato que te va gustar",  precio: 10, img: "./imagenes/chaufan2023.png" },
  { id: 2, nombre: "Aeropuerto",            categoria: "arroz",       cantidad: 1,  descripcion: "Delicioso plato que te va gustar",  precio: 15, img: "./imagenes/aeropuerto.png" },
  { id: 3, nombre: "Chancho Asado",         categoria: "especiales",  cantidad: 1,  descripcion: "Delicioso plato que te va gustar",  precio: 25, img: "./imagenes/ChanchoAsado.png" },
  { id: 4, nombre: "Chancho Cruyoc",        categoria: "especiales",  cantidad: 1,  descripcion: "Delicioso plato que te va gustar",  precio: 27, img: "./imagenes/chanchoCruyoc.png" },
  { id: 5, nombre: "Chancho Kintu",         categoria: "especiales",  cantidad: 1,  descripcion: "Delicioso plato que te va gustar",  precio: 30, img: "./imagenes/chanchoKintu.png" },
  { id: 6, nombre: "Chi Jau Kay",           categoria: "especiales",  cantidad: 1,  descripcion: "Delicioso plato que te va gustar",  precio: 30, img: "./imagenes/chijaukay.png" },
  { id: 7, nombre: "Fideo Saltados",        categoria: "fideos",      cantidad: 1,  descripcion: "Delicioso plato que te va gustar",  precio: 20, img: "./imagenes/fideos2023.png" },
  { id: 8, nombre: "Kam Lu Wantan",         categoria: "especiales",  cantidad: 1,  descripcion: "Delicioso plato que te va gustar",  precio: 28, img: "./imagenes/especial2023.png" },
  { id: 9, nombre: "Ensalada Fansi",        categoria: "ensaladas",   cantidad: 1,  descripcion: "Delicioso plato que te va gustar",  precio: 20, img: "./imagenes/ensalada_Fansi.png" },
  { id: 10, nombre: "Pollo con Verduras",   categoria: "arroz",       cantidad: 1,  descripcion: "Delicioso plato que te va gustar",  precio: 22, img: "./imagenes/pollocverdura.png" },
  { id: 11, nombre: "Saho Fan",             categoria: "arroz",       cantidad: 1,  descripcion: "Delicioso plato que te va gustar",  precio: 24, img: "./imagenes/sahofan.png" },
{ id: 12, nombre: "Sopa FuchiFu",         categoria: "sopas",       cantidad: 1,  descripcion: "Delicioso plato que te va gustar",  precio: 22, img: "./imagenes/SopaFuchifu.png" }]


let carrito = JSON.parse(localStorage.getItem("carrito")) || []
renderizarCarrito(carrito)


renderizarProductos(productos)
/* renderizarCarrito() */


function renderizarProductos(array){
    let contenedor = document.getElementById("contenedor-productos")
    contenedor.innerHTML = ""
    array.forEach( producto => {
        let cards = document.createElement("div")
        cards.className = "cards"
        cards.innerHTML = `
        <div class=card-image> <img src=${producto.img}> </div>
        <div class=card-text> 
        <p class=card-meal-type> ${producto.categoria} </p>
        <h2 class=card-title> ${producto.nombre} </h2>
        <p class=card-body> ${producto.descripcion} </p>
        <button class=card-boton id=${producto.id}>Agregar</button>
        </div>
        <div class=card-price> $ ${producto.precio} </div>
        `
        contenedor.appendChild(cards)
        let boton = document.getElementById(producto.id)
        boton.addEventListener("click", agregarProductoAlCarrito)
    })
}


function agregarProductoAlCarrito(e){    
    let seEncuentra = carrito.some(producto => producto.id === Number(e.target.id))
    if(seEncuentra){
/*         lanzarAlerta("Este producto ya está en el carrito","info") */
        lanzarToastify("Este producto ya está en el carrito")
    }else{
        let productoParaAgregar = productos.find( producto => producto.id === Number(e.target.id))
        carrito.push(productoParaAgregar)
    }
    console.log(carrito)
    renderizarCarrito(carrito)
    localStorage.setItem("carrito", JSON.stringify(carrito))
}



let botonVaciar = document.getElementById('limpiar-carrito')
botonVaciar.addEventListener("click", limpiarCarrito)
function limpiarCarrito(){
    carrito.length = 0
    precioTotal.innerText = "0"
    localStorage.removeItem("carrito")
    renderizarCarrito()
}


function renderizarCarrito(){
    let carritoD = document.getElementById("contenedor-carrito")
    carritoD.innerHTML = "" 
    
    carrito.forEach( producto => {
        let divCarrito = document.createElement("div")
        divCarrito.className = "productoEnElCarrito"
        divCarrito.innerHTML += `
        <table>  
        <tr id=tabla>
        <td>${producto.nombre}</td>
        <td>${producto.precio}</td>
        <td> <p id=cantidad>  ${producto.cantidad} </p></td>
        <td> 
        <button id=${producto.id} class=button>
        <iconify-icon icon="material-symbols:add"></iconify-icon>
        </button>
        </td>
        <td>
        <button id="eliminar${producto.id}" class=button>
        <iconify-icon icon="ph:x-bold"></iconify-icon>
        </button>
        </td>
        </table>
        `
        carritoD.appendChild(divCarrito)
        let botonAgregar = document.getElementById(carritoD.id)
        botonAgregar.addEventListener("click", aumentarCantidadDelCarrito)
        let botonBorrar = document.getElementById(`eliminar${producto.id}`)
        botonBorrar.addEventListener("click",eliminarProductoDelCarrito)
        carrito.innerText = carrito.length    
        let precioTotal = document.getElementById("precioTotal")
        precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0)
        console.log(divCarrito.id)
    })
}

function eliminarProductoDelCarrito(e){
    console.log("Entro")
    let buscandoProducto = carrito.find( producto => producto.id === Number(e.target.id))
    let indiceDelProducto = carrito.indexOf(buscandoProducto)
    carrito.splice(indiceDelProducto, 1)
    precioTotal.innerText = "0"
    renderizarCarrito()
}

function aumentarCantidadDelCarrito(e){
    let productoSelecionado = productos.find( producto => producto.id === Number(e.target.id))
    let indicex = carrito.findIndex(producto => producto.id ===  productoSelecionado.id) 
    carrito[indicex].cantidad++
    renderizarCarrito(carrito)
    localStorage.setItem("carrito", JSON.stringify(carrito))
}





let inputs = document.getElementsByClassName("checks")
for (const ind of inputs) {
    ind.addEventListener("click", filtrarCategoria)
}
function filtrarCategoria() {

    let filtros = []
    for (const ind of inputs) {
/*     console.log(ind.checked)
    console.log(ind.id) */
    if (ind.checked) {
        filtros.push(ind.id)
        }
    }

    let arrayFiltrado = productos.filter(producto => filtros.includes(producto.categoria))
    if (arrayFiltrado.length > 0) {
    renderizarProductos(arrayFiltrado)
    } else {
    renderizarProductos(productos)
    }
}


let finalizaCompra = document.getElementById("comprar")
finalizaCompra.addEventListener("click", terminarCompra)
function terminarCompra(){
let carritoDo = document.getElementById("contenedor-carrito")
carritoDo.innerHTML = ""
    lanzarToastify("Gracias por su compra!")       
    localStorage.removeItem("carrito")
    precioTotal.innerText = "0"
}



function lanzarToastify(text){
    Toastify({
        text: text,
        duration: 3000,
        newWindow: true,
        gravity: "bottom", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        className: "tostada",
      }).showToast();
}