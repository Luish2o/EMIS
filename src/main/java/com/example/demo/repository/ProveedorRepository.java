package com.example.demo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.modelo.Proveedor;

public interface ProveedorRepository extends JpaRepository<Proveedor, Long>  {
	Optional<Proveedor> findByEmail(String email);
	Optional<Proveedor> findById(Long id);
}
