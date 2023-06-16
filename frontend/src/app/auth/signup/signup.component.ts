import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SignupRequest } from 'src/app/interfaces/auth.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor( private fb: FormBuilder, private authService: AuthService, private toastrService: ToastrService ) {

  }
  signupForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required]
  })

  doSignUp() {
    console.log(this.signupForm.value);
    if(this.signupForm.valid) {
      let dt: any = this.signupForm.value;
      let data: SignupRequest = {} as SignupRequest; 
      data.username = dt.username; 
      data.password = dt.password;
      data.confirmPassword = dt.confirmPassword;  
      

      if(data.password.trim() !== data.confirmPassword.trim()) {
        this.toastrService.error("Password and Confirm Password not macthed");
        
      } else {
        console.log("data ", data);
        this.authService.doSignUp(data).subscribe((resp) => {
          this.toastrService.success("User Added");
    
        }, error => {
          this.toastrService.error("Some error from backend", error.message);
        })
      }
    }
    
    
  }
}
