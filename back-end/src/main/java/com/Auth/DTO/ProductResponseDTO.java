package com.Auth.DTO;

import com.Auth.entities.Product;

public class ProductResponseDTO {

    private Long id;
    private String name;
    private String price;
    private Integer amount;
    private String description;
    private byte[] image;
    private String categoria;

    // Construtor vazio
    public ProductResponseDTO() {
    }

    // Construtor que recebe um parâmetro do tipo Product
    public ProductResponseDTO(Product product) {
        this.id = product.getId();
        this.name = product.getName();
        this.price = product.getPrice();
        this.amount = product.getAmount();
        this.description = product.getDescription();
        this.image = product.getImage();
        this.categoria = product.getCategoria();
    }

    // Métodos getters e setters para os campos

    public static ProductResponseDTO fromProduct(Product product) {
        return new ProductResponseDTO(product);
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public Integer getAmount() {
        return amount;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }
    
    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }
}
