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

    public getRole(): string {
        try {
            const userdata = JSON.parse(localStorage.getItem('userdata') || "");
            return userdata && userdata.role ? userdata.role : "";
        } catch (e) {
            return "";
        }
        
    }

    public isAdmin(): boolean {
        try {
            
            if (this.isAuthenticated()) {
                console.log('A 1');
                const userdata = JSON.parse(localStorage.getItem('userdata') || "");
                const role = userdata && userdata.role ? userdata.role : "";

                return role.toLowerCase() === 'admin';
                
            }
            return false;
        } catch (e) {
            return false;
        }
        
    }
}