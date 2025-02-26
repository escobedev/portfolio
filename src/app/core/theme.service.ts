import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    private _isDarkMode: boolean;

    constructor() {
        const theme = window.localStorage.getItem('theme') || "dark-mode";
        this._isDarkMode = theme === 'dark-mode';
        document.documentElement.setAttribute('data-theme', this._isDarkMode ? 'dark-mode' : 'light-mode');
        window.localStorage.setItem('theme', theme);
    }

    get isDarkMode() { return this._isDarkMode; }
    get toggleTheme() {
        return () => {
            this._isDarkMode = ! this._isDarkMode;
            const newTheme = this._isDarkMode ? 'dark-mode' : 'light-mode';
            document.documentElement.setAttribute('data-theme', newTheme);
            window.localStorage.setItem('theme', newTheme);
        }
    }
}
