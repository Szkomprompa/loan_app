package pamiw.eepw.loanmanager.domain.loan;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper
public interface LoanMapper {
    Loan toEntity(LoanDto loanDto);

    @Mapping(target = "lenderEmail", source = "lender.email")
    @Mapping(target = "borrowerEmail", source = "borrower.email")
    @Mapping(target = "creationDate", source = "creationDate", dateFormat = "yyyy-MM-dd")
    LoanDto toDto(Loan loan);

    Loan toEntity(LoanRequest loanRequest);
}
