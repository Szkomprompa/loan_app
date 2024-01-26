package pamiw.eepw.loanmanager.application;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pamiw.eepw.loanmanager.security.*;
import pamiw.eepw.loanmanager.security.password.RecoverPasswordRequest;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "https://localhost:3000", allowCredentials = "true")
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponseWithRecoveryToken> register(
            @Valid @RequestBody RegisterRequest request
    ) {
        return ResponseEntity.ok(authenticationService.register(request));
    }

    @PostMapping("/login")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<AuthenticationResponse> authenticate(
            @Valid @RequestBody AuthenticationRequest request
    ) {
        return ResponseEntity.ok(authenticationService.authenticate(request));
    }

    @PostMapping("/recover-password")
    public ResponseEntity<AuthenticationResponseWithRecoveryToken> resetPassword(
            @Valid @RequestBody RecoverPasswordRequest request
    ) {
        return ResponseEntity.ok(authenticationService.resetPassword(request));
    }
}
