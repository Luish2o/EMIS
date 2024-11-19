package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.modelo.Productopro;

import java.util.List;

@Repository
public interface ProductoproRepository extends JpaRepository<Productopro, Long> {
    List<Productopro> findByProveedorId(Long proveedorId);
}
