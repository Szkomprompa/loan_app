package pamiw.eepw.loanmanager.domain.loan;

import lombok.Builder;
import lombok.Value;
import lombok.extern.jackson.Jacksonized;

@Value
@Builder
@Jacksonized
public class LoanDto {
    Long id;
    Long lenderId;
    Double amount;
    String creationDate;
    String dueDate;
    LoanStatus status;
}
