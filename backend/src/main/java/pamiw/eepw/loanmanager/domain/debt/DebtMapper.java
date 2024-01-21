package pamiw.eepw.loanmanager.domain.debt;

import org.mapstruct.Mapper;

@Mapper
public interface DebtMapper {
    DebtDto toDto(Debt debt);
}
