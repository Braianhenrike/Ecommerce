package com.Auth.repositories;

import com.Auth.entities.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;

<<<<<<< HEAD
import java.util.Optional;

public interface CategoriaRepository extends JpaRepository<Categoria, Long> {
        Optional<Categoria> findByName(String name);
=======
public interface CategoriaRepository extends JpaRepository<Categoria, Long> {
>>>>>>> 081e50a92799b8b39cad2f5900781af36e42e3d3
}