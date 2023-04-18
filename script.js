let productos = [
  { id: 1, nombre: "Arroz Chow Fan", categoria: "arroz", precio: 10, img: "./imagenes/chaufan2023.png" },
  { id: 2, nombre: "Aeropuerto", categoria: "arroz", precio: 15, img: "./imagenes/aeropuerto.png" },
  { id: 3, nombre: "Chancho Asado", categoria: "especiales", precio: 25, img: "./imagenes/ChanchoAsado.png" },
  { id: 4, nombre: "Chancho Cruyoc", categoria: "especiales", precio: 27, img: "./imagenes/chanchoCruyoc.png" },
  { id: 5, nombre: "Chancho Kintu", categoria: "especiales", precio: 30, img: "./imagenes/chanchoKintu.png" },
  { id: 6, nombre: "Chi Jau Kay", categoria: "especiales", precio: 30, img: "./imagenes/chijaukay.png" },
  { id: 7, nombre: "Fideo Saltados", categoria: "fideos", precio: 20, img: "./imagenes/fideos2023.png" },
  { id: 8, nombre: "Kam Lu Wantan", categoria: "especiales", precio: 28, img: "./imagenes/especial2023.png" },
  { id: 9, nombre: "Ensalada Fansi", categoria: "ensaladas", precio: 20, img: "./imagenes/ensalada_Fansi.png" },
  { id: 10, nombre: "Pollo con Verduras", categoria: "arroz", precio: 22, img: "./imagenes/pollocverdura.png" },
  { id: 11, nombre: "Saho Fan", categoria: "arroz", precio: 24, img: "./imagenes/sahofan.png" },
  { id: 12, nombre: "Sopa FuchiFu", categoria: "sopas", precio: 22, img: "./imagenes/SopaFuchifu.png" }]


/* let carrito = [] */
renderizarProductos(productos)




//Función para mostrar las cards
function renderizarProductos(array){
    let contenedor = document.getElementById("contenedor-productos")
    contenedor.innerHTML = " "
    array.forEach( producto => {
      let cards = document.createElement("div")
      cards.className = "cards"
      cards.innerHTML = `
        <div class=card-image> <img src=${producto.img}> </div>
       
        <div class=card-text> 
        <p class=card-meal-type> ${producto.categoria} </p>
        <h2 class=card-title> ${producto.nombre} </h2>
        <p class=card-body> Descripción del plato </p>
        <button class=card-boton id=${producto.id}>Agregar</button>
        </div>
        
        <div class=card-price> $ ${producto.precio} </div>
        `
        contenedor.appendChild(cards)
        let boton = document.getElementById(producto.id)
        boton.addEventListener("click", agregarProductoAlCarrito)
      })
    }

//Función para el botón agregar al carrito
function agregarProductoAlCarrito(e){
  let carrito = []
  mostrarTituloCarrito()

  let productoAgregado = productos.find(producto =>  producto.id === Number(e.target.id) )
    if( carrito.some(producto => producto.id === productoAgregado.id) ){
      alert("Ya esta en el carrito!")
    }else{
        carrito.push({
        id: productoAgregado.id,
        nombre: productoAgregado.nombre,
        precio: productoAgregado.precio,
        unidades: 1,
        subtotal: productoAgregado.precio
      })
    }
    renderizarCarrito(carrito)
    console.log(carrito.some(producto => producto.id === productoAgregado.id))
  }
  
  function mostrarTituloCarrito(){
    let tituloCarrito = document.getElementById("titulo-carrito")
    tituloCarrito.innerHTML = `
          <table>
              <tr id=tabla> 
              <th>Producto</th>
              <th>Precio/Unidad</th>
              <th>Cantidad</th>
              <th>Acción</th>
              <th>Subtotal</th>
              </tr>
          </table>  ` 
  }

  
//Función para mostrar el carrito
function renderizarCarrito(array){
    let carrito = document.getElementById("carrito")
    array.forEach(producto => {
    carrito.innerHTML += `
    <table>  
        <tr id=tabla>
        <td>${producto.nombre}</td>
        <td>${producto.precio}</td>
        <td>${producto.unidades}</td>
        <td> 
        <button id=${producto.id} class=boton-agregar>+</button>
        <button id=${producto.id} class=boton-borrar>-</button>
        </td>
        <td>$${producto.subtotal}</td>
        </tr>
    </table>
    `
  })
  let botonAgregar = document.getElementById(carrito.id)
  botonAgregar.addEventListener("click", aumentarCantidad)
  let botonBorrar = document.getElementById(carrito.id)
  botonBorrar.addEventListener("click", eliminarCantidad)
  console.log(carrito.id)
/*   let botonComprar = document.getElementById("comprar")
  botonComprar.addEventListener("click",terminarCompra) */
}



//Función boton para aumentar la cantidad de productos al carrito
function aumentarCantidad(e){
  console.log(e.target.id)
  let productoSelecionado = productos.find( producto => producto.id == Number(e.target.id))
  let posParaAumentar = carrito.findIndex( producto => producto.id ===  productoSelecionado.id)
  carrito[posParaAumentar].unidades++
  carrito[posParaAumentar].subtotal = carrito[posParaAumentar].precio * carrito[posParaAumentar].unidades
  renderizarCarrito(carrito)
}

//Función botón para eliminar la cantidad de productos del carrito
function eliminarCantidad(e){

  console.log(e.target.id)
  let productoSelecionado = productos.find( producto => producto.id == Number(e.target.id))
  let posParaEliminar = carrito.findIndex( producto => producto.id ===  productoSelecionado.id)
  carrito[posParaEliminar].unidades--
  carrito[posParaEliminar].subtotal = carrito[posParaEliminar].precio * carrito[posParaAumentar].unidades
  renderizarCarrito(carrito)
}

//Función finalizar compra del carrito
/* function terminarCompra(){
  let carrito = document.getElementById("carrito")
  carrito.innerHTML = " "
} */



//Función calcular el total del carrito
//Función para filtrar el carrito
//Función para limpiar el carrito
