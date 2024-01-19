package pamiw.eepw.loanmanager.domain.loan;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pamiw.eepw.loanmanager.domain.user.User;

import java.util.List;
import java.util.stream.Stream;

@Repository
public interface LoanRepository extends JpaRepository<Loan, Long> {
    Stream<Loan> findAllByBorrower(User borrower);
    Stream<Loan> findAllByLender(User lender);
}
