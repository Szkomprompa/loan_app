package pamiw.eepw.loanmanager.domain.debt;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import pamiw.eepw.loanmanager.domain.user.User;

@Entity(name = "debts")
@Setter
@Getter
@SuperBuilder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
public class Debt {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "debt_seq")
    @SequenceGenerator(name="debt_seq", allocationSize = 1)
    private Long id;

    private Double totalAmount;

    private Double unpaidAmount;

    @OneToOne
    @NotNull
    private User user;
}
