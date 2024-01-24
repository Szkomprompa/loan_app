package pamiw.eepw.loanmanager.security.password;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import pamiw.eepw.loanmanager.domain.user.User;

@Entity(name = "passwordresettoken")
@Setter
@Getter
@SuperBuilder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
public class PasswordResetToken {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "passwordresettoken_seq")
    @SequenceGenerator(name="passwordresettoken_seq", allocationSize = 1)
    private Long id;

    private String token;

    @OneToOne
    @NotNull
    private User user;
}
