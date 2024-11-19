const API_PROVEEDORES = 'http://localhost:8080/proveedores';
const API_PRODUCTOS = 'http://localhost:8080/productos';

// Cargar proveedores al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    cargarProveedores();
});

// Cargar la lista de proveedores
function cargarProveedores() {
    fetch(API_PROVEEDORES)
        .then(response => response.json())
        .then(proveedores => {
            const listaProveedores = document.getElementById('listaProveedores');
            listaProveedores.innerHTML = ''; // Limpia la lista anterior

            proveedores.forEach(proveedor => {
                const fila = document.createElement('tr');
                fila.innerHTML = `
                    <td>${proveedor.id}</td>
                    <td>${proveedor.nombre}</td>
                    <td>${proveedor.direccion}</td>
                    <td>${proveedor.telefono}</td>
                    <td>${proveedor.email}</td>
                    <td>
                    <button class="btn btn-primary" data-id="${proveedor.id}" onclick="cargarDatosEnModalEditar(${proveedor.id})">
                                    
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
</svg>

Editar</button>
                    <button class="btn btn-danger" data-id="${proveedor.id}" onclick="borrarProveedor()"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
</svg>Borrar</button>
                    <button class="btn btn-info" data-id="${proveedor.id}" onclick="verProductosDelProveedor(event)"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle-fill" viewBox="-0.5 2 19 15">
                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2"/>
                    </svg>Info</button>
                    </td>
                `;
                listaProveedores.appendChild(fila);
            });
        })
        .catch(error => console.error('Error al cargar los proveedores:', error));
}

function validarFormularioRegistro(nombre, direccion, telefono, email) {


    if (nombre === '') {
        alert('Por favor, ingrese el nombre del proveedor.');
        return false;
    }

    if (direccion === '') {
        alert('Por favor, ingrese la dirección del proveedor.');
        return false;
    }
 
    const telefonoRegex = /^[0-9]{10}$/;
    if (!telefonoRegex.test(telefono)) {
        alert('Por favor, ingrese un número de teléfono válido (debe tener 10 caracteres).');
        return false;
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Por favor, ingrese una dirección de correo electrónico válida.');
        return false;
    }

    return true; 
}


function cargarDatosEnModalEditar(idProveedor){
    fetch(`${API_PROVEEDORES}/${idProveedor}`)
        .then(response => response.json())
        .then(proveedor => {   
            document.getElementById('editarProveedorId').value = proveedor.id;      
            document.getElementById('editarNombreProveedor').value = proveedor.nombre;
            document.getElementById('editarDireccionProveedor').value = proveedor.direccion;
            document.getElementById('editarTelefonoProveedor').value = proveedor.telefono;
            document.getElementById('editarEmailProveedor').value = proveedor.email;
            $('#editarProveedorModal').modal('show');
        })
        .catch(error => console.error('Error al cargar los datos del proveedor:', error));
}

function actualizarProveedor() {
    const id = document.getElementById('editarProveedorId').value;
    const nombre = document.getElementById('editarNombreProveedor').value;
    const direccion = document.getElementById('editarDireccionProveedor').value;
    const telefono = document.getElementById('editarTelefonoProveedor').value;
    const email = document.getElementById('editarEmailProveedor').value;
    if (!validarFormularioRegistro(nombre, direccion, telefono, email)) return;
    

    const proveedorActualizado = {
        nombre,
        direccion,
        telefono,
        email
    };

    fetch(`${API_PROVEEDORES}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(proveedorActualizado)
    })
    .then(response => {
        if (response.ok) {
            $('#editarProveedorModal').modal('hide'); // Cierra el modal de edición
            cargarProveedores(); // Recarga la lista de proveedores
        } else {
            console.error('Error al actualizar proveedor:', response.statusText);
        }
    })
    .catch(error => console.error('Error al actualizar proveedor:', error));
}

function borrarProveedor() {
    const proveedorId = event.target.getAttribute('data-id');
    console.log(proveedorId);
    
    // Mostrar mensaje de confirmación
    const confirmacion = confirm("¿Estás seguro de que deseas eliminar este proveedor?");
    
    if (confirmacion) {
        // Si el usuario confirma, se realiza la solicitud para borrar
        fetch(`${API_PROVEEDORES}/${proveedorId}`, { method: "DELETE" })
            .then(() => {
                alert("Proveedor eliminado correctamente.");
                cargarProveedores(); // Actualizar la lista de proveedores
            })
            .catch(error => {
                console.error("Error al eliminar el proveedor:", error);
                alert("Hubo un error al intentar eliminar el proveedor.");
            });
    } else {
        // Si el usuario cancela, se detiene la acción
        console.log("Eliminación cancelada.");
    }
}


function verProductosDelProveedor(event) {
    const proveedorId = event.target.getAttribute('data-id');
    console.log(`Proveedor seleccionado: ${proveedorId}`); 
    cargarProductosDelProveedor(proveedorId);
    abrirModal();
}

// Función para abrir el modal
function abrirModal() {
    $('#registroModal').modal('show');
}

function cargarProductosDelProveedor(proveedorId) {
    fetch(`${API_PRODUCTOS}/proveedor/${proveedorId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(productos => {
            console.log("Productos recibidos:", productos); 
            const listaProductos = document.getElementById('listaProductos');
            listaProductos.innerHTML = ''; 

            if (!Array.isArray(productos) || productos.length === 0) {
                listaProductos.innerHTML = `
                    <tr><td colspan="8" class="text-center">No hay productos para este proveedor.</td></tr>`;
                return;
            }

            productos.forEach(producto => {
                const fila = document.createElement('tr');
                fila.innerHTML = `
                    <td>${producto.nombre}</td>
                    <td>${producto.marca}</td>
                    <td>${producto.color}</td>
                    <td>${producto.dimension}</td>
                    <td>${producto.categoria}</td>
                    <td>${producto.descripcion}</td>
                    <td>${producto.precio}</td>
                    <td>
                        <button class="btn ${producto.estado === 1 ? 'btn-danger' : 'btn-success'}" 
                                onclick="toggleEstado(this, ${producto.id}, ${producto.estado})">
                            ${producto.estado === 1 ? 'Deshabilitar' : 'Habilitar'}
                        </button>
                    </td>
                `;
                listaProductos.appendChild(fila);
            });
        })
        .catch(error => {
            console.error('Error al cargar los productos del proveedor:', error);
            const listaProductos = document.getElementById('listaProductos');
            listaProductos.innerHTML = `<tr><td colspan="8" class="text-center">No hay productos disponibles</td></tr>`;
        });
}

function toggleEstado(button, id, estadoActual) {
    const nuevoEstado = estadoActual === 1 ? 0 : 1;
    const accion = nuevoEstado === 1 ? 'habilitar' : 'deshabilitar';

    if (!confirm(`¿Estás seguro de que deseas ${accion} este producto?`)) {
        return; 
    }

    
    button.innerText = nuevoEstado === 1 ? 'Deshabilitar' : 'Habilitar';
    button.classList.toggle('btn-success', nuevoEstado === 0);
    button.classList.toggle('btn-danger', nuevoEstado === 1);

    fetch(`${API_PRODUCTOS}/${id}/cambiarEstado`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estado: nuevoEstado })
    })
    .then(response => {
        if (!response.ok) {
            alert('Error al actualizar el estado');
            button.innerText = estadoActual === 1 ? 'Deshabilitar' : 'Habilitar';
            button.classList.toggle('btn-success', estadoActual === 0);
            button.classList.toggle('btn-danger', estadoActual === 1);
        } else {
            button.onclick = () => toggleEstado(button, id, nuevoEstado);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        button.innerText = estadoActual === 1 ? 'Deshabilitar' : 'Habilitar';
        button.classList.toggle('btn-success', estadoActual === 0);
        button.classList.toggle('btn-danger', estadoActual === 1);
    });
}


// Función para abrir el modal de registro de proveedores
function abrirModalRegistroProveedor() {
    $('#registroProveedorModal').modal('show');
}

// Función para registrar un nuevo proveedor
function registrarProveedor() {
    const nombre = document.getElementById('nombreProveedor').value.trim();
    const direccion=  document.getElementById('direccionProveedor').value.trim();
    const telefono= document.getElementById('telefonoProveedor').value.trim();
    const email = document.getElementById('emailProveedor').value.trim();
    if (!validarFormularioRegistro(nombre, direccion, telefono, email)) return; // Si la validación falla, no continúa
   

    
    const proveedor = {
        nombre,
        direccion,
        telefono,
        email
    };

    fetch(API_PROVEEDORES, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(proveedor)
    })
    .then(response => response.json())
    .then(data => {
        $('#registroProveedorModal').modal('hide');
        cargarProveedores();
    })
    .catch(error => console.error('Error al registrar el proveedor:', error));
}

function abrirModalRegistroProducto() {
    // Obtén el ID del proveedor desde el último proveedor cargado o seleccionado
    const proveedorId = $('#registroModal').data('proveedor-id');
    $('#productoProveedorId').val(proveedorId);
    $('#registroProductoModal').modal('show');
}
function registrarProducto() {
    const proveedorId = $('#productoProveedorId').val();
    const nombre = $('#nombreProducto').val();
    const marca = $('#marcaProducto').val();
    const color = $('#colorProducto').val();
    const dimension = $('#dimensionProducto').val();
    const categoria = $('#categoriaProducto').val();
    const descripcion = $('#descripcionProducto').val();
    const precio = $('#precioProducto').val();

    const productoData = {
        proveedorId: proveedorId,
        nombre: nombre,
        marca: marca,
        color: color,
        dimension: dimension,
        categoria: categoria,
        descripcion: descripcion,
        precio: parseFloat(precio)
    };

    fetch(`${API_PRODUCTOS}/registrar/${proveedorId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(productoData)
    })
    .then(response => {
        if (!response.ok) throw new Error('Error al registrar el producto');
        return response.json();
    })
    .then(data => {
        alert('Producto registrado exitosamente');
        $('#registroProductoModal').modal('hide');
        cargarProductosDelProveedor(proveedorId);  // Actualiza la lista de productos
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Ocurrió un error al registrar el producto');
    });
}

function verProductosDelProveedor(event) {
    const proveedorId = event.target.getAttribute('data-id');
    $('#registroModal').data('proveedor-id', proveedorId);
    $('#registroModal').modal('show');

    cargarProductosDelProveedor(proveedorId);
}

function actualizarProducto() {
    const id = document.getElementById('editarProductoId').value;
    const nombre = document.getElementById('editarNombreProducto').value;
    const marca = document.getElementById('editarMarcaProducto').value;
    const color = document.getElementById('editarColorProducto').value;
    const dimension = document.getElementById('editarDimensionProducto').value;
    const categoria = document.getElementById('editarCategoriaProducto').value;
    const descripcion = document.getElementById('editarDescripcionProducto').value;
    const precio = document.getElementById('editarPrecioProducto').value;

    const productoActualizado = {
        nombre,
        marca,
        color,
        dimension,
        categoria,
        descripcion,
        precio: parseFloat(precio)
    };

    fetch(`${API_PRODUCTOS}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(productoActualizado)
    })
    .then(response => {
        if (response.ok) {
            $('#editarProductoModal').modal('hide'); // Cierra el modal de edición
            cargarProductosDelProveedor(); // Recarga la lista de productos
        } else {
            console.error('Error al actualizar el producto:', response.statusText);
        }
    })
    .catch(error => console.error('Error al actualizar el producto:', error));
}
function cargarDatosEnModalEditarProducto(idProducto) {
    console.log("Producto ID:", idProducto);
    fetch(`${API_PRODUCTOS}/${idProducto}`)
        .then(response => response.json())
        .then(producto => {
            console.log("Producto cargado:", producto); // Verifica si el producto es recibido
            document.getElementById('editarProductoId').value = producto.id;
            document.getElementById('editarNombreProducto').value = producto.nombre;
            $('#editarProductoModal').modal('show');
        })
        .catch(error => console.error('Error al cargar los datos del producto:', error));
}

function irAtras() {
    window.location.href = 'index.html';
}