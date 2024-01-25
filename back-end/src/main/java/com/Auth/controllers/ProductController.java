package com.Auth.controllers;

import java.util.List;
import java.util.stream.Collectors;

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
    
    @GetMapping("/home")
	public List<ProductResponseDTO> findAll(){
		List<ProductResponseDTO> result = productService.findAll();
		 return result;
	
	}
    
    @PutMapping("/admin/{id}")
    public void updateProduct(@PathVariable String id, @RequestBody ProductRequestDTO data) {
        Product productData = data.toProduct();
        productService.update(id, productData);
    }

    @DeleteMapping("/admin/{id}")
    public void deleteProduct(@PathVariable String id) {
        productService.delete(id);
    }
}
