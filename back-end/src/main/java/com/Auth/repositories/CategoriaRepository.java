package com.Auth.repositories;

import com.Auth.entities.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CategoriaRepository extends JpaRepository<Categoria, Long> {
        Optional<Categoria> findByNome(String nome);
}