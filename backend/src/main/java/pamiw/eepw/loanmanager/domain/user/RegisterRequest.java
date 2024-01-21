package pamiw.eepw.loanmanager.domain.user;

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
    @Pattern(regexp = "[a-zA-Z0-9]+@[a-zA-Z0-9]+\\.[a-zA-Z0-9]+", message = "Email format is invalid.")
    private String email;

    @NotNull
    @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#&()–[{}]:;',?/*~$^+=<>]).{5,20}$", message = "Password must contain at last: 1 lowercase letter, 1 uppercase letter, 1 digit, 1 special character and be between 5 and 20 characters long.")
    private String password;

    @NotNull
    private String firstName;

    @NotNull
    private String lastName;
}
