package com.Auth.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Auth.DTO.ProductResponseDTO;
import com.Auth.entities.Product;
import com.Auth.repositories.ProductRepository;


@Service
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
	
	
}