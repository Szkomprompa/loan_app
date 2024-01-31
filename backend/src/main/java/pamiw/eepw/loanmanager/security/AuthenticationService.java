package pamiw.eepw.loanmanager.security;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StreamUtils;
import org.springframework.web.server.ResponseStatusException;
import pamiw.eepw.loanmanager.domain.user.*;
import pamiw.eepw.loanmanager.security.password.PasswordResetToken;
import pamiw.eepw.loanmanager.security.password.PasswordResetTokenRepository;
import pamiw.eepw.loanmanager.security.password.RecoverPasswordRequest;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final PasswordResetTokenRepository passwordResetTokenRepository;
    private final UserService userService;
    private final ResourceLoader resourceLoader;

    private static final long BASE_DELAY_MS = 1000;
    private static final long MAX_DELAY_MS = 5000;

    public AuthenticationResponseWithRecoveryToken register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User with this email already exists");
        }
        log.info("Start checking password");
        if (isPasswordCommon(request.getPassword())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Password is too common");
        }
        log.info("End checking password");

        var user = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(UserRole.USER)
                .loginAttempts(0)
                .build();
        userRepository.save(user);

        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponseWithRecoveryToken.builder()
                .token(jwtToken)
                .recoveryToken(userService.generateRecoveryToken(user))
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()
                    )
            );

            resetLoginAttempts(request.getEmail());

            var user = userRepository.findByEmail(request.getEmail()).orElseThrow();
            var jwtToken = jwtService.generateToken(user);
            return AuthenticationResponse.builder()
                    .token(jwtToken)
                    .build();
        } catch (AuthenticationException e) {
            incrementLoginAttempts(request.getEmail());
            log.info("Login attempt failed, incrementing login attempts");

            throw e;
        }
    }

    public AuthenticationResponseWithRecoveryToken resetPassword(RecoverPasswordRequest request) {
        var user = userRepository.findByEmail(request.getEmail()).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
        PasswordResetToken token = passwordResetTokenRepository.findByUserId(userService.findByEmail(request.getEmail()).getId());

        if (!passwordEncoder.matches(request.getToken(), token.getToken())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Token is not valid");
        }
        if (!request.getNewPassword().equals(request.getConfirmationPassword())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Passwords are not the same");
        }
        if (isPasswordCommon(request.getNewPassword())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Password is too common");
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);

        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponseWithRecoveryToken.builder()
                .token(jwtToken)
                .recoveryToken(userService.generateRecoveryToken(user))
                .build();
    }

    private boolean isPasswordCommon(String password) {
        try {
            Resource resource = resourceLoader.getResource("classpath:10-million-password-list-top-1000000.txt");

            log.info("Checking password");

            String content = StreamUtils.copyToString(resource.getInputStream(), StandardCharsets.UTF_8);;
            return List.of(content.split("\\r?\\n")).contains(password);
        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error while checking password");
        }
    }

    private void incrementLoginAttempts(String email) {
        User user = userRepository.findByEmail(email).orElseThrow();
        int currentAttempts = user.getLoginAttempts();
        user.setLoginAttempts(currentAttempts + 1);
        userRepository.save(user);

        long delay = Math.min(BASE_DELAY_MS * currentAttempts, MAX_DELAY_MS);
        try {
            TimeUnit.MILLISECONDS.sleep(delay);
        } catch (InterruptedException e) {
            log.error("InterruptedException while adding login delay: {}", e.getMessage());
            Thread.currentThread().interrupt();
        }
    }

    private void resetLoginAttempts(String email) {
        User user = userRepository.findByEmail(email).orElseThrow();
        user.setLoginAttempts(0);
        userRepository.save(user);
    }
}
