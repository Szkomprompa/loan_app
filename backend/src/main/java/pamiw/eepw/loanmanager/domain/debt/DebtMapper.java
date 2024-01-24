package pamiw.eepw.loanmanager.domain.debt;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper
public interface DebtMapper {
    @Mapping(target = "userEmail", source = "user.email")
    DebtDto toDto(Debt debt);
}
