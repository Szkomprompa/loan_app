package pamiw.eepw.loanmanager.application;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pamiw.eepw.loanmanager.domain.loan.LoanDto;
import pamiw.eepw.loanmanager.domain.loan.LoanRequest;
import pamiw.eepw.loanmanager.domain.loan.LoanService;
import pamiw.eepw.loanmanager.domain.loan.LoanStatus;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/loan")
@RequiredArgsConstructor
@CrossOrigin(origins = "https://localhost:3000")
public class LoanController {
    private final LoanService loanService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<LoanDto> createLoan(
            @Valid @RequestBody LoanRequest loanRequest) {
        log.debug("Create loan: {}", loanRequest);
        return ResponseEntity.ok(loanService.createLoan(loanRequest));
    }

    @PutMapping("/{id}/reply")
    public ResponseEntity<LoanDto> replyToLoan(
            @PathVariable Long id,
            @RequestParam LoanStatus status) {
        log.debug("Reply to loan: {}", id);
        return ResponseEntity.ok(loanService.replyToLoan(id, status));
    }

    @GetMapping("/borrowed")
    public ResponseEntity<List<LoanDto>> findAllBorrowed() {
        log.debug("Find all loans by borrower");
        return ResponseEntity.ok(loanService.findAllBorrowed());
    }

    @GetMapping("/lent")
    public ResponseEntity<List<LoanDto>> findAllLent() {
        log.debug("Find all loans by lender");
        return ResponseEntity.ok(loanService.findAllLent());
    }

    @GetMapping("/{id}")
    public ResponseEntity<LoanDto> findById(
            @PathVariable Long id) {
        log.debug("Find loan by id: {}", id);
        return ResponseEntity.ok(loanService.findById(id));
    }

    @GetMapping("/{id}/repay")
    public ResponseEntity<LoanDto> repayLoan(
            @PathVariable Long id) {
        log.debug("Repay loan: {}", id);
        return ResponseEntity.ok(loanService.repayLoan(id));
    }
}
