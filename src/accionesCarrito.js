import { actualizarTotalesCarrito } from './actualizarCarrito.js';
import { productos } from './stock.js';
import { obtenerCarritoStorage } from './storage.js';

let carrito = [];

const validarProductoRepetido = (productoId) => {

    if (localStorage.getItem("carrito")) {
        carrito = obtenerCarritoStorage();
    };

    const productoRepetido = carrito.find( producto => producto.id === productoId);

    if (productoRepetido) {
        productoRepetido.cantidad++
        const cantidadProducto = document.getElementById(`cantidad${productoRepetido.id}`);
        cantidadProducto.innerText = `Cantidad: ${productoRepetido.cantidad}`;
        actualizarTotalesCarrito(carrito);
        Toastify({
            text: `Se agregó otro ${productoRepetido.nombre} al carrito`,
            duration: 2000,
            style: {
                background: "#000000",
                boxShadow: "0px 2px 4px #00000033",
            }
        }).showToast();
    } else {
        agregarAlCarrito(productoId);
    }
};

const agregarAlCarrito = (productoId) => {
    const contenedor = document.getElementById("carrito-contenedor");
    const producto = productos.find( producto => producto.id === productoId );
    carrito.push(producto);

    const div = document.createElement("div");
    div.classList.add("producto_carrito");
    div.innerHTML = 
    `
    <p>${producto.nombre}</p>
    <p>$${producto.precio}</p>
    <p id=cantidad${producto.id}>Cantidad: ${producto.cantidad}</p>
    <button id=eliminar${producto.id} class="boton_eliminar" value="${producto.id}">X</button>
    `
    contenedor.appendChild(div);
    actualizarTotalesCarrito(carrito);
    Toastify({
        text: `Se agregó ${producto.nombre} al carrito`,
        duration: 2000,
        style: {
            background: "#000000",
            boxShadow: "0px 2px 4px #00000033",
        }
    }).showToast();
};

const pintarCarrito = (carrito) => {
    const contenedor = document.getElementById("carrito-contenedor");

    contenedor.innerHTML = "";

    carrito.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto_carrito");
        div.innerHTML = 
        `
        <p>${producto.nombre}</p>
        <p>$${producto.precio}</p>
        <p id=cantidad${producto.id}>Cantidad: ${producto.cantidad}</p>
        <button id=eliminar${producto.id} class="boton_eliminar" value="${producto.id}">X</button>
        `
        contenedor.appendChild(div);
    });
};

const eliminarProductoCarrito = (productoId) => {
    const carritoStorage = obtenerCarritoStorage();
    const carritoActualizado = carritoStorage.filter( producto => producto.id != productoId);

    actualizarTotalesCarrito(carritoActualizado);
    pintarCarrito(carritoActualizado);
};

const vaciar = document.getElementById("vaciar-carrito");

vaciar.addEventListener("click", () => {
        Swal.fire({
            title: "¿Seguro que desea vaciar el carrito?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#000000",
            cancelButtonColor: "#000000",
            confirmButtonText: "Vaciar carrito",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                carrito.length = 0;
                actualizarTotalesCarrito(carrito);
                pintarCarrito(carrito);
                Swal.fire ({
                    title: "Su carrito se encuentra vacío",
                    text: "Productos eliminados con éxito",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 2100
                })
            }
        })
});

export { agregarAlCarrito, validarProductoRepetido, pintarCarrito, eliminarProductoCarrito};