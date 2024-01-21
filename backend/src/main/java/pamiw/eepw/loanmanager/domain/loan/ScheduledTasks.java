package pamiw.eepw.loanmanager.domain.loan;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class ScheduledTasks {
    private final LoanService loanService;

    public ScheduledTasks(LoanService loanService) {
        this.loanService = loanService;
    }

    @Scheduled(cron = "0 0 0 ? * *")
    public void checkLoans() {
        loanService.checkLoansExpiration();
    }
}
