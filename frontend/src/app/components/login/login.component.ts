import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterModule],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    loginForm: FormGroup;
    isLoading = false;
    errorMessage = '';

    constructor(
        private fb: FormBuilder,
        private router: Router
    ) {
        this.loginForm = this.fb.group({
            username: ['', [Validators.required, Validators.minLength(3)]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    get username() {
        return this.loginForm.get('username');
    }

    get password() {
        return this.loginForm.get('password');
    }

    onSubmit() {
        if (this.loginForm.valid) {
            this.isLoading = true;
            this.errorMessage = '';

            const { username, password } = this.loginForm.value;

            // TODO: Implement actual authentication service
            console.log('Login attempt:', { username, password });

            // Simulate API call
            setTimeout(() => {
                this.isLoading = false;
                // Mock authentication logic
                if (username === 'admin' && password === 'password') {
                    console.log('Login successful');
                    this.router.navigate(['/']);
                } else {
                    this.errorMessage = 'Invalid username or password';
                }
            }, 1000);
        } else {
            this.markFormGroupTouched();
        }
    }

    private markFormGroupTouched() {
        Object.keys(this.loginForm.controls).forEach(key => {
            const control = this.loginForm.get(key);
            control?.markAsTouched();
        });
    }

    getFieldError(fieldName: string): string {
        const field = this.loginForm.get(fieldName);
        if (field?.errors && field.touched) {
            if (field.errors['required']) {
                return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
            }
            if (field.errors['minlength']) {
                return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} must be at least ${field.errors['minlength'].requiredLength} characters`;
            }
        }
        return '';
    }
}
