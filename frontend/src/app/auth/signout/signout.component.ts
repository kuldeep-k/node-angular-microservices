import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signout',
  templateUrl: './signout.component.html',
  styleUrls: ['./signout.component.css']
})
export class SignoutComponent {
  constructor(private router: Router) {
    if(localStorage.getItem("token")) {
      localStorage.clear();
    }

    this.router.navigate(["/signin"]);
  }
}
