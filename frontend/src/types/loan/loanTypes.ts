type LoanDto = {
    id: number;
    lenderEmail: string;
    borrowerEmail: string;
    amount: number;
    creationDate: string;
    dueDate: string;
    status: string;
}

type LoanRequest = {
    borrowerEmail: string;
    amount: number;
    dueDate: string;
}

// export enum LoanStatus {
//     ACCEPTED = "ACCEPTED",
//     REJECTED = "REJECTED",
//     PENDING = "PENDING",
//     EXPIRED = "EXPIRED",
//     PAID = "PAID"
// }

export type {LoanDto, LoanRequest};