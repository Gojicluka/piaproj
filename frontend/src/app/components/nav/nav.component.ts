import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-nav',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss']
})
export class NavComponent {
    isLoggedIn = false;
    userType: string | null = null;

    onLogin() {
        // This will be implemented when we have authentication service
        console.log('Login clicked');
    }

    onLogout() {
        this.isLoggedIn = false;
        this.userType = null;
        // Clear authentication data
        console.log('Logout clicked');
    }
}
