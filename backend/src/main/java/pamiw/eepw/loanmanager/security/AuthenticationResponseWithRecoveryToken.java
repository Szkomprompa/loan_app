package pamiw.eepw.loanmanager.security;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponseWithRecoveryToken {
    private String token;

    private String recoveryToken;
}
