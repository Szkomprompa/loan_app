package pamiw.eepw.loanmanager.domain.debt;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pamiw.eepw.loanmanager.domain.loan.Loan;
import pamiw.eepw.loanmanager.domain.loan.LoanStatus;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DebtService {
    private final DebtRepository debtRepository;

    public void updateDebtAmount(Debt debt, Loan loan) {
        double loanAmount = loan.getAmount();

        if (loan.getStatus() == LoanStatus.ACCEPTED) {
            debt.setTotalAmount(debt.getTotalAmount() + loanAmount);
        } else if (loan.getStatus() == LoanStatus.EXPIRED) {
            debt.setUnpaidAmount(debt.getUnpaidAmount() + loanAmount);
        } else if (loan.getStatus() == LoanStatus.PAID) {
            debt.setUnpaidAmount(debt.getUnpaidAmount() - loanAmount);
        }
    }

    public List<Debt> findAll() {
        return debtRepository.findAll();
    }
}
