package pamiw.eepw.loanmanager.domain.debt;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class DebtDto {
    private Long id;
    private Double totalAmount;
    private Double unpaidAmount;
    private String userEmail;
}
