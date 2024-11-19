package com.example.demo.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.modelo.Proveedor;
import com.example.demo.repository.ProveedorRepository;
import java.util.List;
@RestController
@RequestMapping("/proveedores")
public class ProveedorController {

	@Autowired
	private ProveedorRepository proveedorRepository;
	
	
	@GetMapping("/{id}")
	public Proveedor obtenerProveedorPorId(@PathVariable Long id) {
	    return proveedorRepository.findById(id).orElseThrow();
	}
	
	
	 @GetMapping
	    public List<Proveedor> listarProveedores() {
	        return proveedorRepository.findAll();
	    }
	 
	 @PostMapping
	    public Proveedor crearProveedor(@RequestBody Proveedor proveedor) {
	        return proveedorRepository.save(proveedor);
	    }

	 @PutMapping("/{id}")
	    public Proveedor actualizarProveedor(@PathVariable Long id, @RequestBody Proveedor proveedorActualizado) {
	        Proveedor proveedor = proveedorRepository.findById(id).orElseThrow();
	        proveedor.setNombre(proveedorActualizado.getNombre());
	        proveedor.setDireccion(proveedorActualizado.getDireccion());
	        proveedor.setTelefono(proveedorActualizado.getTelefono());
	        proveedor.setEmail(proveedorActualizado.getEmail());
	        return proveedorRepository.save(proveedor);
	    }

	    @DeleteMapping("/{id}")
	    public void eliminarProveedor(@PathVariable Long id) {
	        proveedorRepository.deleteById(id);
	    }
}
