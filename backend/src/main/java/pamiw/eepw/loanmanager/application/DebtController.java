package pamiw.eepw.loanmanager.application;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pamiw.eepw.loanmanager.domain.debt.DebtDto;
import pamiw.eepw.loanmanager.domain.debt.DebtService;

import java.util.List;

@RestController
@Slf4j
@RequestMapping("/api/debt")
@RequiredArgsConstructor
@CrossOrigin(origins = "https://localhost:3000")
public class DebtController {
    private final DebtService debtService;

    @GetMapping
    public ResponseEntity<List<DebtDto>> getAllDebts() {
        log.debug("Get all debts");
        return ResponseEntity.ok(debtService.findAll());
    }
}
