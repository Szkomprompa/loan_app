package pamiw.eepw.loanmanager.domain.loan;

import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
public class LoanRequest {
    @Email(message = "Email should be valid")
    @NotNull
    private String borrowerEmail;

    @Positive(message = "Amount must be positive")
    @Digits(integer = 6, fraction = 2, message = "Amount must have max 2 decimal places")
    private Double amount;

    @Future(message = "Due date must be in the future")
    @NotNull
    private LocalDate dueDate;
}
