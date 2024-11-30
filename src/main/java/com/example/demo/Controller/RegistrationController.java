package com.example.demo.Controller;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Model.MyAppUser;
import com.example.demo.Model.MyAppUserRepository;
import com.example.demo.Model.Producto;
import com.example.demo.Model.SalidaProducto;

import com.example.demo.Security.SalidaProductoRepository;
import com.example.demo.modelo.Proveedor;
import com.example.demo.repository.ProveedorRepository;
import com.example.demo.Security.ProductoRepository;


@RestController
public class RegistrationController {
    
	
	 @Autowired
	    private ProductoRepository productoRepository;

	 
	    @GetMapping
	    public List<Producto> obtenerTodosLosProductos() {
	        return productoRepository.findAll();
	    }
	
    @Autowired
    private MyAppUserRepository myAppUserRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @PostMapping(value = "/req/signup", consumes = "application/json")
    public MyAppUser createUser(@RequestBody MyAppUser user){
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return myAppUserRepository.save(user);
    }
    
    @Autowired
	private ProveedorRepository proveedorRepository;
    
    @GetMapping("/prove")
    public List<Proveedor> listarProveedores() {
        return proveedorRepository.findAll();
    }
    
    @Autowired
    private SalidaProductoRepository salidaProductoRepository;
    
    @PostMapping(value = "/salida")
    public ResponseEntity<SalidaProducto> crearSalidaProducto(@RequestBody SalidaProducto salidaProducto) {
        salidaProducto.setFechaHoraSalida(LocalDateTime.now());

        // Depuración: Verifica el valor de cantidadp al recibir el objeto
        System.out.println("Objeto SalidaProducto recibido:");
        System.out.println("ID Producto: " + salidaProducto.getProductoId());
        System.out.println("Cantidad solicitada (cantidadp): " + salidaProducto.getCantidadp());

        Optional<Producto> productoOpt = productoRepository.findById(salidaProducto.getProductoId());
        if (!productoOpt.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        Producto producto = productoOpt.get();
        int cantidadSolicitada = salidaProducto.getCantidadp();


        System.out.println("Cantidad solicitada para salida: " + cantidadSolicitada);
        System.out.println("Cantidad actual en inventario antes de salida: " + producto.getCantidad());

        if (producto.getCantidad() < cantidadSolicitada) {
            System.out.println("No hay suficiente cantidad en el inventario.");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }

        int nuevaCantidad = producto.getCantidad() - cantidadSolicitada;
        producto.setCantidad(nuevaCantidad);
        productoRepository.save(producto);

        salidaProducto.setCantidadp(cantidadSolicitada);
        SalidaProducto nuevaSalidaProducto = salidaProductoRepository.save(salidaProducto);

        System.out.println("Cantidad actual en inventario después de salida: " + nuevaCantidad);
        return new ResponseEntity<>(nuevaSalidaProducto, HttpStatus.CREATED);
    }


    @GetMapping(value = "/his")
    public List<SalidaProducto> getAllSalidas() {
        return salidaProductoRepository.findAll();
    }
    
    @PostMapping()
    public ResponseEntity<Producto> agregarProducto(@RequestBody Producto producto) {
        try {
            Producto nuevoProducto = productoRepository.save(producto);
            return new ResponseEntity<>(nuevoProducto, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Producto> actualizarProducto(@PathVariable Long id, @RequestBody Producto producto) {
        return productoRepository.findById(id)
                .map(productoExistente -> {
                    productoExistente.setNombre(producto.getNombre());
                    productoExistente.setMarca(producto.getMarca());
                    productoExistente.setCategoria(producto.getCategoria());
                    productoExistente.setColor(producto.getColor());
                    productoExistente.setDimension(producto.getDimension());
                    productoExistente.setDescripcion(producto.getDescripcion());
                    productoExistente.setCantidad(producto.getCantidad());
                    Producto actualizado = productoRepository.save(productoExistente);
                    return new ResponseEntity<>(actualizado, HttpStatus.OK);
                })
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Producto> actualizarProductoParcialmente(@PathVariable Long id, @RequestBody Map<String, Object> cambios) {
        return productoRepository.findById(id)
                .map(productoExistente -> {
                    cambios.forEach((campo, valor) -> {
                        switch (campo) {
                            case "nombre":
                                productoExistente.setNombre((String) valor);
                                break;
                            case "marca":
                                productoExistente.setMarca((String) valor);
                                break;
                            case "categoria":
                                productoExistente.setCategoria((String) valor);
                                break;
                            case "color":
                                productoExistente.setColor((String) valor);
                                break;
                            case "dimension":
                                productoExistente.setDimension((String) valor);
                                break;
                            case "descripcion":
                                productoExistente.setDescripcion((String) valor);
                                break;
                            case "cantidad":
                                productoExistente.setCantidad((Integer) valor);
                                break;
                            default:
                                break;
                        }
                    });
                    Producto actualizado = productoRepository.save(productoExistente);
                    return new ResponseEntity<>(actualizado, HttpStatus.OK);
                })
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarProducto(@PathVariable Long id) {
        return productoRepository.findById(id)
                .map(producto -> {
                    productoRepository.deleteById(id);
                    return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
                })
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    
    
}






