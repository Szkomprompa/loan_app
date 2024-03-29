package pamiw.eepw.loanmanager.security.password;

import jakarta.validation.constraints.Pattern;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ChangePasswordRequest {

    private String currentPassword;

    @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#&()–[{}]:;',?/*~$^+=<>]).{7,20}$", message = "Password must contain at last: 1 lowercase letter, 1 uppercase letter, 1 digit, 1 special character and be between 5 and 20 characters long.")
    private String newPassword;

    private String confirmationPassword;
}
