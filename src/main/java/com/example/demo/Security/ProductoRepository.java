package com.example.demo.Security;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Model.Producto;



public interface ProductoRepository  extends JpaRepository<Producto, Long> {

}
