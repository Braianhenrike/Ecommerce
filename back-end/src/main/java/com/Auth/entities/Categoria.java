package com.Auth.entities;

import lombok.*;

import jakarta.persistence.*;

@Table(name = "tb_categoria")
@Entity(name = "categoria")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class Categoria {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}
    
    
}
