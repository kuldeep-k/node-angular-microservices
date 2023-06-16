import { Component } from '@angular/core';
import { AuthGuardService } from '../guard/auth-guard.service';
import { DrawerToggleService } from '../services/drawer-toggle.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  isAuthenticated: boolean = false;
  events: string[] = [];
  opened: boolean = true;

  constructor(private authGuardService: AuthGuardService, private drawerToggleService: DrawerToggleService) {
    this.isAuthenticated = authGuardService.isAuthenticated();
    this.drawerToggleService.getValue().subscribe( (val: boolean) => {
      console.log("Event triggered to ", val);
      this.opened = val;
    });
  }


}
