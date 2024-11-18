package grupo5.demo.cliente;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

public interface ClienteRepo extends CrudRepository<Cliente, Long> {
    Optional<Cliente> findByEmail(String email);
}




