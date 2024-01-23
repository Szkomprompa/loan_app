type DebtDto = {
    id: number;
    totalAmount: number;
    unpaidAmount: number;
    userEmail: string;
}

type DebtDtoWithoutId = {
    totalAmount: number;
    unpaidAmount: number;
    userEmail: string;
}

export type {DebtDto, DebtDtoWithoutId};