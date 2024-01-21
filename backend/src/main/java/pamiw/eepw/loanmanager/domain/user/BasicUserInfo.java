package pamiw.eepw.loanmanager.domain.user;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class BasicUserInfo {
    private Long id;
    private String email;
    private String firstName;
    private String lastName;
}
