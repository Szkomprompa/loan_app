package pamiw.eepw.loanmanager.domain.loan;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import pamiw.eepw.loanmanager.domain.debt.DebtService;
import pamiw.eepw.loanmanager.domain.user.User;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LoanService {
    private final LoanRepository loanRepository;
    private final LoanMapper loanMapper;
    private final DebtService debtService;

    //TODO: change
    public LoanDto createLoan(LoanDto loanDto) {
        Loan loan = loanMapper.toEntity(loanDto);
        User borrower = loan.getBorrower();
        return loanMapper.toDto(loan);
    }

    public LoanDto findById(Long id) {
        return loanRepository
                .findById(id)
                .map(loanMapper::toDto)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Loan not found"));
    }

    public List<LoanDto> findAll() {
        return loanRepository.findAll().stream().map(loanMapper::toDto).toList();
    }

    public List<LoanDto> findAllByBorrower(User borrower) {
        return loanRepository.findAllByBorrower(borrower).map(loanMapper::toDto).toList();
    }

    public List<LoanDto> findAllByLender(User lender) {
        return loanRepository.findAllByLender(lender).map(loanMapper::toDto).toList();
    }

    public void replyToLoan(Loan loan, LoanStatus status) {
        if (status != LoanStatus.ACCEPTED && status != LoanStatus.REJECTED) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid status");
        }
        if (loan.getStatus() != LoanStatus.PENDING) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Loan is not pending");
        }

        loan.setStatus(status);
        if (status == LoanStatus.ACCEPTED) {
            debtService.updateDebtAmount(loan.getBorrower().getDebt(), loan);
        }
    }

    public void repayLoan(Long id) {
        Loan loan = loanRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Loan not found"));
        if (loan.getStatus() != LoanStatus.ACCEPTED && loan.getStatus() != LoanStatus.EXPIRED) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Loan is not accepted");
        }
        loan.setStatus(LoanStatus.PAID);
        debtService.updateDebtAmount(loan.getBorrower().getDebt(), loan);
    }

    private void setLoanExpired(Loan loan) {
        if (loan.getStatus() != LoanStatus.ACCEPTED) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Loan is not accepted");
        }
        loan.setStatus(LoanStatus.EXPIRED);
        debtService.updateDebtAmount(loan.getBorrower().getDebt(), loan);
    }

    private void checkExpirationDate(Loan loan) {
        if (loan.getDueDate().isBefore(LocalDate.now())) {
            setLoanExpired(loan);
        }
    }
}
