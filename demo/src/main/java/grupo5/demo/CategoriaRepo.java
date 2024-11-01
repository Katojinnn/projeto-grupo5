package grupo5.demo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoriaRepo extends JpaRepository<Categoria, Long> {
}
