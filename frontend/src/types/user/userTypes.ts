type RegisterRequest = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

type ChangePasswordRequest = {
    currentPassword: string;
    newPassword: string;
    confirmationPassword: string;
}

type LoginRequest = {
    email: string;
    password: string;
}

type RecoverPasswordRequest = {
    token: string;
    newPassword: string;
    confirmationPassword: string;
    email: string;
}

type AuthResponse = {
    token: string;
}

type AuthResponseWithRecoveryToken = {
    token: string;
    recoveryToken: string;
}

export type {RegisterRequest, LoginRequest, AuthResponse, ChangePasswordRequest, RecoverPasswordRequest, AuthResponseWithRecoveryToken};