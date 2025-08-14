export type Gender = 'M' | 'Z';
export type CreditCardType = 'DINERS' | 'MASTERCARD' | 'VISA';
export type UserType = 'turista' | 'vlasnik_vikendice' | 'administrator';

export interface IUser {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    gender: Gender;
    userType: UserType;
    address: string;
    phoneNumber: string;
    email: string;
    profileImage?: string;
    creditCardNumber: string;
    creditCardType: CreditCardType;
    createdAt?: Date;
    updatedAt?: Date;
}

// Password validation regex
export const PASSWORD_REGEX = /^[a-zA-Z](?=.*[A-Z])(?=.*[a-z]{3,})(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{5,9}$/;

// Credit card validation patterns
export const CREDIT_CARD_PATTERNS = {
    DINERS: /^(300|301|302|303|36|38)\d{12,13}$/, // 15 digits
    MASTERCARD: /^(51|52|53|54|55)\d{14}$/,       // 16 digits
    VISA: /^(4539|4556|4916|4532|4929|4485|4716)\d{12}$/ // 16 digits
} as const;

export function validatePassword(password: string): boolean {
    return PASSWORD_REGEX.test(password);
}

export function validateCreditCard(number: string): CreditCardType | null {
    if (CREDIT_CARD_PATTERNS.DINERS.test(number)) {
        return 'DINERS';
    } else if (CREDIT_CARD_PATTERNS.MASTERCARD.test(number)) {
        return 'MASTERCARD';
    } else if (CREDIT_CARD_PATTERNS.VISA.test(number)) {
        return 'VISA';
    }
    return null;
}
