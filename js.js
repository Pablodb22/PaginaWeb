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

const carrito = [];
const DOMitems = document.querySelector('#items');
const botones = document.querySelectorAll('.boton-menu');

function renderizarProductos(productoselegidos) {
    DOMitems.innerHTML = "";
    productoselegidos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("product");
        div.innerHTML = `
            <img src="${producto.img}">
            <h3 id=${producto.id}>${producto.nombre}</h3>
            <p>${producto.descripcion}</p>
            <p class="precio">${producto.precio}€</p>
            <button class="agregar">Añadir Carrito</button>
        `;
        DOMitems.append(div);
    });
}

function mostrarCarrito() {
    var x = document.getElementById("carrito");
    if (x.style.display === "none") {
        x.style.display = "block";
        renderizarCarrito();
    } else {
        x.style.display = "none";
    }
}

function renderizarCarrito() {
    const tbody = document.querySelector('.carrito-products');
    tbody.innerHTML = '';
    carrito.forEach((producto, indice) => {
        const tr = document.createElement('tr');
        tr.classList.add('carrito-product');
        tr.innerHTML = `
            <td><img id="fotoProducto" src="${producto.foto}" class="imagen-carrito"></td>
            <td id="nombreProducto">${producto.nombre}</td>
            <td id="cantidadProducto">${producto.cantidad}</td>
            <td id="precioProducto">${producto.precio}</td>
            <td><button class="quitar" data-indice="${indice}">Quitar</button></td>
        `;
        tbody.appendChild(tr);
    });

    document.querySelectorAll('.quitar').forEach(boton => {
        boton.addEventListener('click', quitarDelCarrito);
    });

    document.getElementById('precioTotal').textContent = carrito.reduce((total, producto) => total + parseFloat(producto.precio) * producto.cantidad, 0) + '€';
}




function agregarCarrito(e) {
    if (e.target.classList.contains('agregar')) {
        const boton = e.target;
        const item = boton.closest('.product');
        const itemTitulo = item.querySelector('h3').textContent;
        const itemPrecio = item.querySelector('.precio').textContent;
        const itemImg = item.querySelector('img').src;

        const nuevoItem = {
            nombre: itemTitulo,
            precio: itemPrecio,
            foto: itemImg,
            cantidad: 1
        };

        const existeEnCarrito = carrito.some(itemCarrito => itemCarrito.nombre === nuevoItem.nombre);

        if (existeEnCarrito) {
            carrito.forEach(itemCarrito => {
                if (itemCarrito.nombre === nuevoItem.nombre) {
                    itemCarrito.cantidad++;
                }
            });
        } else {
            carrito.push(nuevoItem);
        }

        renderizarCarrito();
    }
}

function quitarDelCarrito(e) {
    const indice = e.target.dataset.indice;
    const producto = carrito[indice];
    producto.cantidad--;

    if (producto.cantidad <= 0) {
        carrito.splice(indice, 1);
    }

    renderizarCarrito();
}
DOMitems.addEventListener('click', agregarCarrito);
DOMitems.addEventListener('click', quitarDelCarrito);

botones.forEach(boton => {
    boton.addEventListener("click", (e) => {
        if (e.currentTarget.id != "general") {
            const productosBoton = baseDeDatos.filter(producto => producto.id === e.currentTarget.id);
            renderizarProductos(productosBoton);
        } else {
            renderizarProductos(baseDeDatos);
        }
    });
});

document.getElementById('cerrarCarrito').addEventListener('click', function () {
    document.getElementById('carrito').style.display = 'none';
});




window.addEventListener("load", renderizarProductos(baseDeDatos));

document.querySelector('.boton_comprar').addEventListener('click', function() {
    carrito.length = 0;

    renderizarCarrito();

    alert('¡Gracias por tu compra!');
});