package pamiw.eepw.loanmanager.domain.loan;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class LoanDto {
    private Long id;
    private String lenderEmail;
    private String borrowerEmail;
    private Double amount;
    private String creationDate;
    private String dueDate;
    private LoanStatus status;
}
