package com.Auth.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.Auth.DTO.ProductRequestDTO;
import com.Auth.DTO.ProductResponseDTO;
import com.Auth.entities.Product;
import com.Auth.repositories.ProductRepository;
import com.Auth.services.ProductService;

@RestController
@RequestMapping("product")
public class ProductController {

	@Autowired
	private ProductService productService;

    @PostMapping("/admin")
    public void saveProduct(@RequestBody ProductRequestDTO data) {
    	System.out.println("Received data: " + data);
		Product productData = data.toProduct();
		productService.save(productData);
	}
}
