package com.Auth.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Auth.DTO.ProductResponseDTO;
import com.Auth.entities.Product;
import com.Auth.repositories.ProductRepository;

import jakarta.transaction.Transactional;


@Service
@Transactional
public class ProductService {

	@Autowired
	private ProductRepository productRepository;

	
	public Product save(Product product) {
        return productRepository.save(product);
    }
	
	public List<ProductResponseDTO> findAll(){
		List<Product> result = productRepository.findAll();
		return result.stream().map(x -> new ProductResponseDTO (x)).toList();
	}
	
	public Product update(String id, Product product) {
	    Product existingProduct = productRepository.findById(id)
	        .orElseThrow(() -> new RuntimeException("Product not found with id " + id));
	    existingProduct.setName(product.getName());
	    existingProduct.setPrice(product.getPrice());
	    // Adicionar outros campos para atualizar
	    return productRepository.save(existingProduct);
	}

	public void delete(String id) {
	    Product product = productRepository.findById(id)
	        .orElseThrow(() -> new RuntimeException("Product not found with id " + id));
	    productRepository.delete(product);
	}
	
	
	
}