package pamiw.eepw.loanmanager.security.password;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class RecoverPasswordRequest {

    @NotNull
    private String token;

    @NotNull
    @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#&()–[{}]:;',?/*~$^+=<>]).{5,20}$", message = "Password must contain at last: 1 lowercase letter, 1 uppercase letter, 1 digit, 1 special character and be between 5 and 20 characters long.")
    private String newPassword;

    @NotNull
    private String confirmationPassword;

    @NotNull
    @Email
    private String email;
}
