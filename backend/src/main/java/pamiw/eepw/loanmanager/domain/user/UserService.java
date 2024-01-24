package pamiw.eepw.loanmanager.domain.user;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import pamiw.eepw.loanmanager.security.password.ChangePasswordRequest;
import pamiw.eepw.loanmanager.security.password.PasswordResetToken;
import pamiw.eepw.loanmanager.security.password.PasswordResetTokenRepository;

import java.security.Principal;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final PasswordResetTokenRepository passwordResetTokenRepository;

    public User findByEmail(String email) {
        return userRepository.findByEmail(email).orElseThrow( () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
    }

    public User getCurrentUser() {
        return Optional.ofNullable( (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not logged in"));
    }

    public void changePassword(ChangePasswordRequest request, Principal connectedUser) {

        var user = (User) ((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();

        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
            throw new IllegalStateException("Wrong password");
        }
        if (!request.getNewPassword().equals(request.getConfirmationPassword())) {
            throw new IllegalStateException("Password are not the same");
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));

        userRepository.save(user);
    }

    public String getRecoveryToken(Principal connectedUser) {
        var user = (User) ((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();

        PasswordResetToken token;
        String tokenString = generateRecoveryToken();
        Optional<PasswordResetToken> tokenOptional = passwordResetTokenRepository.findByUserEmail(user.getEmail());
        if (tokenOptional.isEmpty()) {
            token = PasswordResetToken.builder()
                    .user(user)
                    .token(passwordEncoder.encode(tokenString))
                    .build();
        } else {
            token = tokenOptional.get();
        }
        passwordResetTokenRepository.save(token);
        return tokenString;
    }

    private String generateRecoveryToken() {
        return UUID.randomUUID().toString().substring(0, 8);
    }
}
