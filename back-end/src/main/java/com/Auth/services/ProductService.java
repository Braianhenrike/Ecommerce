package com.Auth.services;

import java.util.List;

import com.Auth.entities.Categoria;
import com.Auth.repositories.CategoriaRepository;
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


	@Autowired
	private CategoriaRepository categoriaRepository;

	
	public List<ProductResponseDTO> findAll(){
		List<Product> result = productRepository.findAll();
		return result.stream().map(product -> new ProductResponseDTO (product)).toList();
	}


	public Product save(Product product, String categoriaName) {
		Categoria categoria = categoriaRepository.findByName(categoriaName)
				.orElseThrow(() -> new RuntimeException("Categoria not found with name " + categoriaName));
		product.setCategoria(categoria);
		return productRepository.save(product);
	}

	public Product update(String id, Product product, String categoriaName) {
		Product existingProduct = productRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Product not found with id " + id));
		Categoria categoria = categoriaRepository.findByName(categoriaName)
				.orElseThrow(() -> new RuntimeException("Categoria not found with name " + categoriaName));
		existingProduct.setName(product.getName());
		existingProduct.setPrice(product.getPrice());
		existingProduct.setCategoria(categoria);
		return productRepository.save(existingProduct);
	}

	public void delete(String id) {
	    Product product = productRepository.findById(id)
	        .orElseThrow(() -> new RuntimeException("Product not found with id " + id));
	    productRepository.delete(product);
	}
	
	
	
}