package com.Auth.entities;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;


import com.Auth.DTO.ProductRequestDTO;

@Table(name = "tb_product")
@Entity(name = "product")
public class Product {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

	private String name;

    private String price;

    private Integer amount;

    private String description;
    
    private byte[] image;

    @Column(name = "categoria")
    private String categoria;
    
    public Product() {
    }
    
    public Product(Long id, String name, String price, Integer amount, String description, byte[] image, String categoria) {
    	this.id = id;
        this.name = name;
        this.price = price;
        this.amount = amount;
        this.description = description;
        this.image = image;
        this.categoria = categoria;
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