import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import {
    CreditCardType,
    Gender,
    UserType,
    validateCreditCard,
    validatePassword
} from '../../models/user.model';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterModule],
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
    registerForm: FormGroup;
    isLoading = false;
    errorMessage = '';

    // Available options for templates
    genders: Gender[] = ['M', 'Z'];
    userTypes: UserType[] = ['turista', 'vlasnik_vikendice', 'administrator'];
    creditCardTypes: CreditCardType[] = ['DINERS', 'MASTERCARD', 'VISA'];

    constructor(
        private fb: FormBuilder,
        private router: Router
    ) {
        this.registerForm = this.fb.group({
            username: ['', [Validators.required, Validators.minLength(3)]],
            password: ['', [Validators.required, this.passwordValidator]],
            confirmPassword: ['', [Validators.required]],
            firstName: ['', [Validators.required, Validators.minLength(2)]],
            lastName: ['', [Validators.required, Validators.minLength(2)]],
            gender: ['', [Validators.required]],
            address: ['', [Validators.required]],
            phone: ['', [Validators.required, Validators.pattern(/^\+?[1-9]\d{1,14}$/)]],
            email: ['', [Validators.required, Validators.email]],
            profilePicture: [''],
            creditCardNumber: ['', [Validators.required, this.creditCardValidator]],
            userType: ['', [Validators.required]]
        }, { validators: this.passwordMatchValidator });
    }

    get username() { return this.registerForm.get('username'); }
    get password() { return this.registerForm.get('password'); }
    get confirmPassword() { return this.registerForm.get('confirmPassword'); }
    get firstName() { return this.registerForm.get('firstName'); }
    get lastName() { return this.registerForm.get('lastName'); }
    get gender() { return this.registerForm.get('gender'); }
    get address() { return this.registerForm.get('address'); }
    get phone() { return this.registerForm.get('phone'); }
    get email() { return this.registerForm.get('email'); }
    get profilePicture() { return this.registerForm.get('profilePicture'); }
    get creditCardNumber() { return this.registerForm.get('creditCardNumber'); }
    get userType() { return this.registerForm.get('userType'); }

    passwordValidator(control: AbstractControl): { [key: string]: any } | null {
        if (!control.value) return null;
        const isValid = validatePassword(control.value);
        return isValid ? null : { 'invalidPassword': true };
    }

    creditCardValidator(control: AbstractControl): { [key: string]: any } | null {
        if (!control.value) return null;
        const isValid = validateCreditCard(control.value);
        return isValid ? null : { 'invalidCreditCard': true };
    }

    passwordMatchValidator(form: AbstractControl): { [key: string]: any } | null {
        const password = form.get('password');
        const confirmPassword = form.get('confirmPassword');

        if (!password || !confirmPassword || !password.value || !confirmPassword.value) {
            return null;
        }

        return password.value === confirmPassword.value ? null : { 'passwordMismatch': true };
    }

    onSubmit() {
        if (this.registerForm.valid) {
            this.isLoading = true;
            this.errorMessage = '';

            const formData = this.registerForm.value;
            delete formData.confirmPassword; // Remove confirm password from submission

            // TODO: Implement actual registration service
            console.log('Registration attempt:', formData);

            // Simulate API call
            setTimeout(() => {
                this.isLoading = false;
                console.log('Registration successful');
                this.router.navigate(['/login']);
            }, 2000);
        } else {
            this.markFormGroupTouched();
        }
    }

    private markFormGroupTouched() {
        Object.keys(this.registerForm.controls).forEach(key => {
            const control = this.registerForm.get(key);
            control?.markAsTouched();
        });
    }

    getFieldError(fieldName: string): string {
        const field = this.registerForm.get(fieldName);
        if (field?.errors && field.touched) {
            const fieldDisplayName = fieldName.replace(/([A-Z])/g, ' $1').toLowerCase();

            if (field.errors['required']) {
                return `${fieldDisplayName.charAt(0).toUpperCase() + fieldDisplayName.slice(1)} is required`;
            }
            if (field.errors['minlength']) {
                return `${fieldDisplayName.charAt(0).toUpperCase() + fieldDisplayName.slice(1)} must be at least ${field.errors['minlength'].requiredLength} characters`;
            }
            if (field.errors['email']) {
                return 'Please enter a valid email address';
            }
            if (field.errors['pattern'] && fieldName === 'phone') {
                return 'Please enter a valid phone number';
            }
            if (field.errors['invalidPassword']) {
                return 'Password must be 6-10 characters with 1 uppercase, 3 lowercase, 1 number, and 1 special character';
            }
            if (field.errors['invalidCreditCard']) {
                return 'Please enter a valid credit card number (DINERS, MASTERCARD, or VISA)';
            }
        }

        // Form-level errors
        if (fieldName === 'confirmPassword' && this.registerForm.errors?.['passwordMismatch'] && this.confirmPassword?.touched) {
            return 'Passwords do not match';
        }

        return '';
    }

    getUserTypeDisplay(userType: UserType): string {
        const displayNames: Record<UserType, string> = {
            'turista': 'Tourist',
            'vlasnik_vikendice': 'Weekend House Owner',
            'administrator': 'Administrator'
        };
        return displayNames[userType] || userType;
    }

    getGenderDisplay(gender: Gender): string {
        const displayNames: Record<Gender, string> = {
            'M': 'Male',
            'Z': 'Female'
        };
        return displayNames[gender] || gender;
    }
}
