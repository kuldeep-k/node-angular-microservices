import { Component } from '@angular/core';
import { AuthGuardService } from 'src/app/guard/auth-guard.service';

@Component({
  selector: 'app-leftbar',
  templateUrl: './leftbar.component.html',
  styleUrls: ['./leftbar.component.css']
})
export class LeftbarComponent {
  isAuthenticated: boolean = false;
  
  constructor(private authGuardService: AuthGuardService) {
    this.isAuthenticated = authGuardService.isAuthenticated();
  }
}
