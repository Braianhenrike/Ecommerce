package com.Auth.entities;

import lombok.*;

import jakarta.persistence.*;

@Table(name = "tb_categoria")
@Entity(name = "categoria")
@Getter
@Setter
@AllArgsConstructor
<<<<<<< HEAD
=======
@NoArgsConstructor
>>>>>>> 081e50a92799b8b39cad2f5900781af36e42e3d3
@EqualsAndHashCode
public class Categoria {
	
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    public Categoria() {
    }

    public Categoria(String id) {
        this.id = Long.valueOf(id);
    }
    
    
	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}
    
    
}
