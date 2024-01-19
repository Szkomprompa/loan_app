package pamiw.eepw.loanmanager.application;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import pamiw.eepw.loanmanager.domain.loan.LoanDto;
import pamiw.eepw.loanmanager.domain.loan.LoanService;

import java.util.List;

@Slf4j
@RestController
@RequestMapping(value = "loans")
@RequiredArgsConstructor
public class LoanController {
    private final LoanService loanService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public LoanDto createLoan(
            @RequestBody LoanDto loanDto) {
        log.debug("Create loan: {}", loanDto);
        return loanService.createLoan(loanDto);
    }

    @GetMapping("/{id}")
    public LoanDto findById(
            @PathVariable Long id) {
        log.debug("Find loan by id: {}", id);
        return loanService.findById(id);
    }

    @GetMapping
    public List<LoanDto> findAll() {
        log.debug("Find all loans");
        return loanService.findAll();
    }
}
