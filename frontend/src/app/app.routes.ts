import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent)
    },
    {
        path: 'login',
        loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'register',
        loadComponent: () => import('./components/register/register.component').then(m => m.RegisterComponent)
    },
    {
        path: 'houses',
        loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent) // Placeholder - will be replaced with actual houses component
    },
    {
        path: 'my-houses',
        loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent) // Placeholder - will be replaced with actual my-houses component
    },
    {
        path: 'admin',
        loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent) // Placeholder - will be replaced with actual admin component
    },
    {
        path: 'profile',
        loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent) // Placeholder - will be replaced with actual profile component
    },
    {
        path: '**',
        redirectTo: ''
    }
];
