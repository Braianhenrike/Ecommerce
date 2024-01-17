package com.Auth.DTO;

import org.springframework.validation.annotation.Validated;

import com.Auth.entities.Categoria;
import com.Auth.entities.Product;

@Validated
public record ProductRequestDTO(String name, String price, Integer amount, String description, byte[] image, Categoria categoria) {
	
	    public Product toProduct() {
	        return new Product(
	        		null,
	                this.name,
	                this.price,
	                this.amount,
	                this.description,
	                this.image,
	                this.categoria
	        );
	    }

}
