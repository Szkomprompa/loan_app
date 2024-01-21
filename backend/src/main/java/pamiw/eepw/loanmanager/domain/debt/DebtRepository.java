package pamiw.eepw.loanmanager.domain.debt;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pamiw.eepw.loanmanager.domain.user.User;

import java.util.Optional;

@Repository
public interface DebtRepository extends JpaRepository<Debt, Long> {
    Optional<Debt> findDebtByUser(User user);
}
