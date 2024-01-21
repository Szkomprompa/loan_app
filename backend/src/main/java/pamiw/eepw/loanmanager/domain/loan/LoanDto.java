package pamiw.eepw.loanmanager.domain.loan;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class LoanDto {
    Long id;
    String lenderEmail;
    String borrowerEmail;
    Double amount;
    String creationDate;
    String dueDate;
    LoanStatus status;
}
