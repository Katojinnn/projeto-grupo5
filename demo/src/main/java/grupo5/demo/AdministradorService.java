package grupo5.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class AdministradorService implements UserDetailsService {

    @Autowired
    private AdministradorRepo administradorRepo;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Administrador administrador = administradorRepo.findByEmail(email);
        if (administrador == null) {
            throw new UsernameNotFoundException("Administrador não encontrado");
        }
        
        return User.builder()
                .username(administrador.getEmail())
                .password(administrador.getSenha())
                .roles("ADMIN")  // Atribua um papel, como "ADMIN"
                .build();
    }
}
