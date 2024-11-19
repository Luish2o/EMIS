package com.example.demo.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.modelo.Productopro;
import com.example.demo.modelo.Proveedor;
import com.example.demo.repository.ProductoproRepository;
import com.example.demo.repository.ProveedorRepository;

@Service
public class ProductoService {
	
	 @Autowired
	 private ProductoproRepository productoRepository;
	 
	  @Autowired
	  private ProveedorRepository proveedorRepository;

	    public Productopro registrarProducto(Long proveedorId, Productopro producto) {
	        Proveedor proveedor = proveedorRepository.findById(proveedorId)
	                .orElseThrow(() -> new RuntimeException("Proveedor no encontrado"));

	        producto.setProveedor(proveedor);
	        return productoRepository.save(producto);
	    }

	    
	  public boolean actualizarEstado(Long id, int nuevoEstado) {
		  Optional<Productopro> productoOptional = productoRepository.findById(id);
		  if(productoOptional.isPresent()) {
			  Productopro producto = productoOptional.get();
			  producto.setEstado(nuevoEstado);
			  productoRepository.save(producto);
			  return true;
		  }
		  
		  return false;
	  }  
	    
}
