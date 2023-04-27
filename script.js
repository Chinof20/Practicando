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


let carrito = []
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
  /*   let carrito = [] */
/*   mostrarTituloCarrito() */

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
/*     console.log(carrito) */
  }
  
  
/*   function mostrarTituloCarrito(){
  let tituloCarrito = document.createElement("div")
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
  */
      
    
let totalPago = 0;
 //Función para mostrar el carrito
 function renderizarCarrito(array){
   let carritoD = document.getElementById("carrito")
   carritoD.innerHTML = "" 
      carritoD.innerHTML = `
        <table>
        <tr id=tabla> 
        <th>Producto</th>
        <th>Precio/Unidad</th>
        <th>Cantidad</th>
        <th>Acción</th>
          <th>Subtotal</th>
          </tr>
          </table>
          <button id=comprar>Finalizar Compra</button>
        <tr id=tabla>Total: ${totalPago}</tr>
          ` 
          
          
      array.forEach(producto => {
        carritoD.innerHTML += `
      <table>  
      <tr id=tabla>
      <td>${producto.nombre}</td>
      <td>${producto.precio}</td>
      <td>${producto.unidades}</td>
      <td> 
      <button id=${producto.id} class=boton-agregar>+</button>
      <button class=boton-borrar>-</button>
      </td>
      <td>$${producto.subtotal}</td>
      </tr>
      </table>
      `
/*       console.log(carritoD) */
    })
/*     let totalDo = document.createElement("div")
    totalDo.className = "total"
    totalDo.innerHTML = `
    <table>
    <tr id=tabla>Total: ${totalPago}</tr>
    </table>
    <button id=comprar>Finalizar Compra</button>
      ` */
    /*     carritoD.innerHTML= `<tr id=tabla>Total</tr>` */
    
    let botonAgregar = document.getElementById(carritoD.id)
    botonAgregar.addEventListener("click", aumentarCantidad)
    let botonBorrar = document.getElementById("tabla")
    botonBorrar.addEventListener("click", eliminarCantidad)
    let botonComprar = document.getElementById("comprar")
    botonComprar.addEventListener("click", terminarCompra)
  }
  
  
  
  //Función boton para aumentar la cantidad de productos al carrito
  function aumentarCantidad(e){
    /*   console.log(e.target.id) */
    let productoSelecionado = productos.find( producto => producto.id === Number(e.target.id))
    let posParaAumentar = carrito.findIndex( producto => producto.id ===  productoSelecionado.id )
    carrito[posParaAumentar].unidades++
    carrito[posParaAumentar].subtotal = carrito[posParaAumentar].precio * carrito[posParaAumentar].unidades
    totalPago = carrito.reduce( (acc, el)=> acc + (el.precio*el.unidades), 0)
    console.log(posParaAumentar)
    console.log(productoSelecionado)
    renderizarCarrito(carrito)
  }




//Función botón para eliminar la cantidad de productos del carrito
function eliminarCantidad(e){
  
  console.log(e.target.id)
  let productoSelecionado = productos.find( producto => producto.id == Number(e.target.id))
  let posParaEliminar = carrito.findIndex( producto => producto.id ===  productoSelecionado.id)
  
  carrito.remove()
  console.log(productoSelecionado)
  renderizarCarrito(carrito)
}

//Función finalizar compra del carrito
/* let botonComprar = document.getElementById("comprar")
botonComprar.addEventListener("click",terminarCompra) */
function terminarCompra(){
  let carritoDo = document.getElementById("carrito")
  carritoDo.innerHTML = ""
  Swal.fire(
    'Gracias por su compra!',
    'Hasta luego',
    'success'
    )
}





//Función para filtrar el carrito
let inputs = document.getElementsByClassName("checks")
for (const ind of inputs) {
  ind.addEventListener("click", filtrarCategoria)
}

function filtrarCategoria() {
/*       console.log(e.target.id) */
      let filtros = []
      for (const ind of inputs) {
          console.log(ind.checked)
          console.log(ind.id)
          if (ind.checked) {
              filtros.push(ind.id)
          }
      }
      console.log(filtros)
      let arrayFiltrado = productos.filter(producto => filtros.includes(producto.categoria))
      if (arrayFiltrado.length > 0) {
          renderizarProductos(arrayFiltrado)
      } else {
          renderizarProductos(productos)
      }
  }

//Función para limpiar el carrito
