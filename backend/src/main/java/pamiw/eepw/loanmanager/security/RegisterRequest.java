package pamiw.eepw.loanmanager.security;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
    @NotNull
    @Email(message = "Email should be valid")
    private String email;

    @NotNull
    @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#&()–[{}]:;',?/*~$^+=<>]).{5,20}$", message = "Password must contain at last: 1 lowercase letter, 1 uppercase letter, 1 digit, 1 special character and be between 5 and 20 characters long.")
    private String password;

    @NotNull
    @Pattern(regexp = "^[A-Z][a-z]+$", message = "First name must start with uppercase letter and contain only letters")
    private String firstName;

    @NotNull
    @Pattern(regexp = "^[A-Z][a-z]+(-[A-Z][a-z]+)?$", message = "Last name must start with uppercase letter and contain only letters and may contain a hyphen")
    private String lastName;
}
