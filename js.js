const baseDeDatos = [
{
    id: 'camiseta',
    nombre:'camiseta1',
    precio: 22,
    descripcion: 'camiseta1',
    img: 'Fotos/pexels-godisable-jacob-226636-970374.jpg'
},
{
    id: 'camiseta',
    nombre:'camiseta2',
    descripcion:'camiseta2',
    precio: 20,
    img: 'Fotos/pexels-kowalievska-1055691.jpg'
},
{
    id: 'camiseta',
    nombre:'camiseta3',
    descripcion:'camiseta3',
    precio: 18,
    img: 'Fotos/pexels-hazardos-1306246.jpg'
},
{
    id: 'pantalon',
    nombre:'pantalon1',
    descripcion:'pantalon1',
    precio: 25,
    img: 'Fotos/pexels-godisable-jacob-226636-885590.jpg'
},
{
    id: 'pantalon',
    nombre:'pantalon2',
    descripcion:'pantalon2',
    precio: 21,
    img: 'Fotos/pexels-cottonbro-4937449.jpg'
},
{
    id: 'pantalon',
    nombre:'pantalon3',
    descripcion:'pantalon3',
    precio: 24,
    img: 'Fotos/pexels-godisable-jacob-226636-1068638.jpg'
},
{
    id: 'zapatillas',
    nombre:'zapatillas1',
    descripcion:'zapatillas1',
    precio: 32,
    img: 'Fotos/pexels-moy-caro-photographer-296475578-21913838.jpg'
},
{
    id: 'zapatillas',
    nombre:'zapatillas2',
    descripcion:'zapatillas2',
    precio: 35,
    img: 'Fotos/pexels-wendelmoretti-1972115.jpg'
}
]

const DOMitems = document.querySelector('#items');
const botones=document.querySelectorAll('.boton-menu');

/*Renderizar Productos*/ 
function renderizarProductos(productoselegidos){
    DOMitems.innerHTML="";
    productoselegidos.forEach(producto => {
       const div=document.createElement("div");
       div.classList.add("product");
       div.innerHTML =`
        <img src="${producto.img}">
        <h3 id=${producto.id}>${producto.nombre}</h3>
        <p>${producto.descripcion}</p>
        <p>${producto.precio}€</p>
        <button>Añadir Carrito</button>
        </div>`;
        DOMitems.append(div);
    })
}

/*Menu*/
botones.forEach(boton => {
    boton.addEventListener("click",(e) => {   
        if(e.currentTarget.id != "general"){
        const productosBoton=baseDeDatos.filter(producto => producto.id===e.currentTarget.id);
        renderizarProductos(productosBoton);
        }else{
            renderizarProductos(baseDeDatos);
        }
        
    })
});

/*Cuando te metas por primera vez a la pagina que aparezcan todos los productos*/
window.addEventListener("load",renderizarProductos(baseDeDatos));


var carrito = document.getElementById("carrito");


var boton = document.getElementById("botoncarrito");


var span = document.getElementsByClassName("cerrar")[0];

//Cuando el usuario hace clic en el botón, abre el carrito 
boton.onclick = function() {
    carrito.style.display = "block";
}

//Cuando el usuario hace clic en la x, cierra el carrito
span.onclick = function() {
    carrito.style.display = "none";
}

//Cuando el usuario hace clic en cualquier lugar fuera del carrito, lo cierra
window.onclick = function(event) {
  if (event.target == carrito) {
    carrito.style.display = "none";
  }
}


