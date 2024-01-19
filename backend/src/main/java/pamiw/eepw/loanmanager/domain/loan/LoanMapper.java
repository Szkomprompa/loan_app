package pamiw.eepw.loanmanager.domain.loan;

import org.mapstruct.Mapper;

@Mapper
public interface LoanMapper {
    Loan toEntity(LoanDto loanDto);
    LoanDto toDto(Loan loan);
}
