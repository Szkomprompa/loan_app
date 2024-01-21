package pamiw.eepw.loanmanager.domain.loan;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import pamiw.eepw.loanmanager.domain.debt.DebtService;
import pamiw.eepw.loanmanager.domain.user.User;
import pamiw.eepw.loanmanager.domain.user.UserService;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LoanService {
    private final LoanRepository loanRepository;
    private final LoanMapper loanMapper;
    private final DebtService debtService;
    private final UserService userService;

    public LoanDto createLoan(LoanRequest loanRequest) {
        Loan loan = loanMapper.toEntity(loanRequest);
        User lender = userService.findByEmail(userService.getCurrentUser().getEmail());
        User borrower = userService.findByEmail(loanRequest.getBorrowerEmail());

        if (lender.getEmail().equals(borrower.getEmail())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "You cannot lend money to yourself");
        }

        loan.setLender(lender);
        loan.setBorrower(borrower);
        loan.setCreationDate(LocalDate.now());
        loan.setStatus(LoanStatus.PENDING);

        Loan newLoan = loanRepository.save(loan);
        return loanMapper.toDto(newLoan);
    }

    public List<LoanDto> findAllBorrowed() {
        String borrowerEmail = userService.getCurrentUser().getEmail();
        return loanRepository.findAllByBorrowerEmail(borrowerEmail).stream().map(loanMapper::toDto).toList();
    }

    public List<LoanDto> findAllLent() {
        String lender = userService.getCurrentUser().getEmail();
        return loanRepository.findAllByLenderEmail(lender).stream().map(loanMapper::toDto).toList();
    }

    public LoanDto replyToLoan(Long id, LoanStatus status) {
        Loan loan = loanRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Loan not found"));

        if (status != LoanStatus.ACCEPTED && status != LoanStatus.REJECTED) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid status");
        }
        if (loan.getStatus() != LoanStatus.PENDING) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Loan is not pending");
        }
        if (!loan.getBorrower().getEmail().equals(userService.getCurrentUser().getEmail())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "You are not the borrower");
        }
        LoanStatus previousStatus = loan.getStatus();
        loan.setStatus(status);
        if (status == LoanStatus.ACCEPTED) {
            debtService.updateUserDebt(loan, previousStatus);
        }

        Loan savedLoan = loanRepository.save(loan);
        return loanMapper.toDto(savedLoan);
    }

    public LoanDto repayLoan(Long id) {
        Loan loan = loanRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Loan not found"));
        if (loan.getStatus() != LoanStatus.ACCEPTED && loan.getStatus() != LoanStatus.EXPIRED) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Loan is not accepted");
        }
        if (!loan.getLender().getEmail().equals(userService.getCurrentUser().getEmail())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "You are not the lender");
        }
        LoanStatus previousStatus = loan.getStatus();
        loan.setStatus(LoanStatus.PAID);
        debtService.updateUserDebt(loan, previousStatus);
        return loanMapper.toDto(loan);
    }

    public void checkLoansExpiration() {
        List<Loan> loans = loanRepository.findAll();

        for (Loan loan : loans) {
            checkExpirationDate(loan);
        }
    }

    private void setLoanExpired(Loan loan) {
        if (loan.getStatus() != LoanStatus.ACCEPTED && loan.getStatus() != LoanStatus.EXPIRED) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Loan is not accepted or already expired");
        }
        LoanStatus previousStatus = loan.getStatus();
        loan.setStatus(LoanStatus.EXPIRED);
        debtService.updateUserDebt(loan, previousStatus);
    }

    private void checkExpirationDate(Loan loan) {
        if (loan.getDueDate().isBefore(LocalDate.now())) {
            setLoanExpired(loan);
        }
    }
}
