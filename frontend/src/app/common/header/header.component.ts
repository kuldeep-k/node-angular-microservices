import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DrawerToggleService } from 'src/app/services/drawer-toggle.service';
import { ProfileImageService } from 'src/app/services/profile-image.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  profileImageUrl: String = "http://localhost:4200/assets/default.png";
  sideNavOpened: boolean = true;

  constructor(private drawerToggleService: DrawerToggleService, private profileImageService: ProfileImageService, private router: Router) {
    this.getProfileImage();

    this.profileImageService.getValue().subscribe( (val: string) => {
      console.log("Event triggered to ", val);
      if(val !== null && val !== "")
        this.profileImageUrl = "http://localhost:3000/" + val;
    });
  }

  getProfileImage() {
    if(localStorage.getItem("userdata")) {
      const userdatastr = localStorage.getItem("userdata");
      const userdata = JSON.parse(userdatastr || "");
      if(userdata.profile_picture) {
        this.profileImageUrl = "http://localhost:3000/" + userdata.profile_picture
      }
    }
  }
  
  toggleSideNav() {
    console.log("Event triggered ");
    this.sideNavOpened = !this.sideNavOpened;
    console.log("Event triggered by ", this.sideNavOpened);
    this.drawerToggleService.setValue(this.sideNavOpened);
  }

  gotoProfile() {
    this.router.navigate(["/profile"]);
  }

  gotoChangePassword() {
    this.router.navigate(["/change-password"]);
  }

  gotoSignout() {
    this.router.navigate(["/signout"]);
  }
}
