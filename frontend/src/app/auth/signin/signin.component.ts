import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SigninRequest } from 'src/app/interfaces/auth.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService, private toastrService: ToastrService
    ) {

  }

  signinForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  })

  doSignIn() {
    console.log(this.signinForm.value);
    if(this.signinForm.valid) {
      let dt: any = this.signinForm.value;
      let data: SigninRequest = {} as SigninRequest; 
      data.username = dt.username; 
      data.password = dt.password;

      
      console.log("data ", data);
      this.authService.doSignIn(data).subscribe((resp) => {
        this.toastrService.success("User Sign In successfully");
        localStorage.setItem("token", resp.token);
        localStorage.setItem("userdata", JSON.stringify(resp.userData));
        this.router.navigate(['']);

      }, error => {
        console.log(error);
        if(error.error && error.error.error) {
          this.toastrService.error("Service Error", error.error.error);
        } else {
          this.toastrService.error("Some error from backend", error.message);
        }
        
      })
    
    }
    
    
  }
}
