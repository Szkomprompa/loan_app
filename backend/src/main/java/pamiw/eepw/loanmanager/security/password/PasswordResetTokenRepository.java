package pamiw.eepw.loanmanager.security.password;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pamiw.eepw.loanmanager.domain.user.User;

import java.util.Optional;

@Repository
public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {
    Optional<PasswordResetToken> findByUserEmail(String email);

    PasswordResetToken findByUserId(Long id);
}
