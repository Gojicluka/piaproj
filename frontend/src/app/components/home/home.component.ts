import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {
    features = [
        {
            icon: 'fas fa-home',
            title: 'Find Your Perfect Weekend House',
            description: 'Browse through our extensive collection of beautiful weekend houses in scenic locations.',
            color: 'primary'
        },
        {
            icon: 'fas fa-star',
            title: 'Premium Properties',
            description: 'All our properties are carefully selected and verified to ensure the highest quality.',
            color: 'success'
        },
        {
            icon: 'fas fa-shield-alt',
            title: 'Secure Booking',
            description: 'Safe and secure payment processing with our trusted booking system.',
            color: 'info'
        },
        {
            icon: 'fas fa-users',
            title: 'Community Driven',
            description: 'Join our community of house owners and travelers sharing amazing experiences.',
            color: 'warning'
        }
    ];

    stats = [
        { number: '500+', label: 'Weekend Houses', icon: 'fas fa-home' },
        { number: '1000+', label: 'Happy Customers', icon: 'fas fa-smile' },
        { number: '50+', label: 'Locations', icon: 'fas fa-map-marker-alt' },
        { number: '99%', label: 'Satisfaction Rate', icon: 'fas fa-thumbs-up' }
    ];

    testimonials = [
        {
            name: 'Marko Petrovic',
            role: 'Tourist',
            text: 'Amazing experience! Found the perfect weekend house for our family vacation.',
            rating: 5,
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
        },
        {
            name: 'Ana Jovanovic',
            role: 'House Owner',
            text: 'Great platform to list my property. Professional service and excellent support.',
            rating: 5,
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
        },
        {
            name: 'Stefan Nikolic',
            role: 'Tourist',
            text: 'Easy booking process and beautiful properties. Highly recommend!',
            rating: 5,
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
        }
    ];

    generateStars(rating: number): number[] {
        return Array(rating).fill(0);
    }
}
