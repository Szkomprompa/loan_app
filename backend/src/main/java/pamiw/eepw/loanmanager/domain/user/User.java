package pamiw.eepw.loanmanager.domain.user;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.SuperBuilder;
import pamiw.eepw.loanmanager.domain.debt.Debt;
import pamiw.eepw.loanmanager.domain.loan.Loan;

import java.util.Set;

@Entity(name = "users")
@Setter
@Getter
@SuperBuilder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_seq")
    @SequenceGenerator(name="user_seq", allocationSize = 1)
    private Long id;

    @NotNull
    private String email;

    @NotNull
    private String firstName;

    @NotNull
    private String lastName;

    private String password;

    @OneToMany(mappedBy = "borrower")
    private Set<Loan> loans;

    @OneToOne
    private Debt debt;
}
