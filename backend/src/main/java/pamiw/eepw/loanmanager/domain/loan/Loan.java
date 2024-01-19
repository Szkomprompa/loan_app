package pamiw.eepw.loanmanager.domain.loan;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.*;
import lombok.experimental.SuperBuilder;
import pamiw.eepw.loanmanager.domain.user.User;

import java.time.LocalDate;

@Entity(name = "loans")
@Setter
@Getter
@Builder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
public class Loan {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "loan_seq")
    @SequenceGenerator(name="loan_seq", allocationSize = 1)
    private Long id;

    @NotNull
    @ManyToOne
    private User lender;

    @NotNull
    @ManyToOne
    private User borrower;

    @NotNull
    @Positive
    private Double amount;

    @NotNull
    private LocalDate creationDate;

    @NotNull
    private LocalDate dueDate;

    @Enumerated(EnumType.STRING)
    private LoanStatus status;
}
