package pamiw.eepw.loanmanager.domain.debt;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import pamiw.eepw.loanmanager.domain.loan.Loan;
import pamiw.eepw.loanmanager.domain.loan.LoanStatus;
import pamiw.eepw.loanmanager.domain.user.User;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DebtService {
    private final DebtRepository debtRepository;
    private final DebtMapper debtMapper;

    public void updateUserDebt(Loan loan, LoanStatus previousStatus) {
        Debt debt;
        User borrower = loan.getBorrower();
        Optional<Debt> debtOptional = debtRepository.findDebtByUser(borrower);

        if(!debtOptional.isPresent()) {
            debt = Debt.builder().user(borrower).totalAmount(loan.getAmount()).unpaidAmount(0.0).build();
        } else {
            debt = debtOptional.get();
            updateDebtAmount(debt, loan, previousStatus);
        }

        debtRepository.save(debt);
    }

    private void updateDebtAmount(Debt debt, Loan loan, LoanStatus previousStatus) {
        double loanAmount = loan.getAmount();

        if (loan.getStatus() == LoanStatus.ACCEPTED) {
            debt.setTotalAmount(debt.getTotalAmount() + loanAmount);
        } else if (loan.getStatus() == LoanStatus.EXPIRED) {
            debt.setUnpaidAmount(debt.getUnpaidAmount() + loanAmount);
        } else if (loan.getStatus() == LoanStatus.PAID && previousStatus == LoanStatus.EXPIRED) {
            debt.setUnpaidAmount(debt.getUnpaidAmount() - loanAmount);
        }
    }

    public List<DebtDto> findAll() {
        return debtRepository.findAll().stream().map(debtMapper::toDto).toList();
    }
}
