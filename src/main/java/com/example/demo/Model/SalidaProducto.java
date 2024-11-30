package com.example.demo.Model;


import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class SalidaProducto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre_encargado", nullable = false)
    private String nombreEncargado;

    @Column(name = "nombre_solicitante", nullable = false)
    private String nombreSolicitante;

    @Column(name = "fecha_hora_salida", nullable = false)
    private LocalDateTime fechaHoraSalida;

    @Column(nullable = false)
    private Long productoId;

    @Column(nullable = false)
    private String producto;
    
    @Column(nullable = false)
    private int cantidadp;

    @Column
    private String categoria;

    // Constructor sin argumentos
    public SalidaProducto() {}

    
    
    // Getters y Setters
    public Long getId() {
        return id;
    }
    

    public void setId(Long id) {
        this.id = id;
    }
    
    

    public Long getProductoId() {
		return productoId;
	}



	public void setProductoId(Long productoId) {
		this.productoId = productoId;
	}



	public void setProducto(String producto) {
		this.producto = producto;
	}



	public String getNombreEncargado() {
        return nombreEncargado;
    }

    public void setNombreEncargado(String nombreEncargado) {
        this.nombreEncargado = nombreEncargado;
    }

    public String getNombreSolicitante() {
        return nombreSolicitante;
    }

    public void setNombreSolicitante(String nombreSolicitante) {
        this.nombreSolicitante = nombreSolicitante;
    }

    public LocalDateTime getFechaHoraSalida() {
        return fechaHoraSalida;
    }

    public void setFechaHoraSalida(LocalDateTime fechaHoraSalida) {
        this.fechaHoraSalida = fechaHoraSalida;
    }




    public int getCantidadp() {
		return cantidadp;
	}



	public void setCantidadp(int cantidadp) {
		this.cantidadp = cantidadp;
	}



	public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }
}