package grupo5.demo;

import org.springframework.data.repository.CrudRepository;

public interface AdministradorRepo extends CrudRepository<Administrador, Long> {
    Administrador findByEmail(String email);
}
