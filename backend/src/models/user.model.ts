import { CREDIT_CARD_PATTERNS, IUser, PASSWORD_REGEX } from '@piaproj/shared';
import { Document, Schema, model } from 'mongoose';

// Interface extending both shared IUser and Document
export interface IUserDocument extends IUser, Document { }

// Schema definition
const userSchema = new Schema<IUserDocument>({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: function (v: string) {
                return PASSWORD_REGEX.test(v);
            },
            message: 'Password must be 6-10 characters, start with a letter, contain 1 uppercase letter, 3 lowercase letters, 1 number, and 1 special character'
        }
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ['M', 'Z']
    },
    userType: {
        type: String,
        required: true,
        enum: ['turista', 'vlasnik_vikendice', 'administrator'],
        default: 'turista'
    },
    address: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address']
    },
    profileImage: {
        type: String
    },
    creditCardNumber: {
        type: String,
        required: true,
        validate: {
            validator: function (v: string) {
                return Object.values(CREDIT_CARD_PATTERNS).some(pattern => pattern.test(v));
            },
            message: 'Invalid credit card number. Must be a valid Diners (15 digits), MasterCard (16 digits), or Visa (16 digits) card number'
        }
    },
    creditCardType: {
        type: String,
        required: true,
        enum: ['DINERS', 'MASTERCARD', 'VISA'],
        validate: {
            validator: function (this: IUserDocument) {
                if (this.creditCardNumber) {
                    if (CREDIT_CARD_PATTERNS.DINERS.test(this.creditCardNumber)) {
                        return this.creditCardType === 'DINERS';
                    } else if (CREDIT_CARD_PATTERNS.MASTERCARD.test(this.creditCardNumber)) {
                        return this.creditCardType === 'MASTERCARD';
                    } else if (CREDIT_CARD_PATTERNS.VISA.test(this.creditCardNumber)) {
                        return this.creditCardType === 'VISA';
                    }
                }
                return false;
            },
            message: 'Credit card type does not match the card number pattern'
        }
    }
}, {
    timestamps: true // This will automatically add createdAt and updatedAt fields
});

// Create and export the model
export const User = model<IUserDocument>('User', userSchema);

// Types for request validation
export interface CreateUserDTO {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    gender: 'M' | 'Z';
    userType: 'turista' | 'vlasnik_vikendice' | 'administrator';
    address: string;
    phoneNumber: string;
    email: string;
    profileImage?: string;
    creditCardNumber: string;
}
