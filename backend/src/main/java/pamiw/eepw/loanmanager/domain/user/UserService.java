package pamiw.eepw.loanmanager.domain.user;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    final UserRepository userRepository;

    public User findByEmail(String email) {
        return userRepository.findByEmail(email).orElseThrow( () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
    }

    public User getCurrentUser() {
        return Optional.ofNullable( (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not logged in"));
    }
}
