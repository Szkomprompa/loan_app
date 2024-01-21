package pamiw.eepw.loanmanager.domain.loan;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
public class LoanRequest {
    @Email
    @NotNull
    private String borrowerEmail;

    @Positive
    private Double amount;

    @Future
    @NotNull
    private LocalDate dueDate;
}
