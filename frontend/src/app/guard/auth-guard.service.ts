import { Injectable } from "@angular/core";

@Injectable()
export class AuthGuardService {

    constructor() {

    }

    public isAuthenticated(): boolean {
        let token = localStorage.getItem('token') || "";

        if(token) {
            return true;
        }

        return false;
    }

    public getToken(): string {
        return localStorage.getItem('token') || "";

    }
}