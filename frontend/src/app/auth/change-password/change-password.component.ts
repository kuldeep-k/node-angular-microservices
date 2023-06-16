import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ChangePasswordRequest } from 'src/app/interfaces/auth.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  constructor( private fb: FormBuilder, private authService: AuthService, 
    private toastrService: ToastrService ) {
    
  }
  changePasswordForm = this.fb.group({
    current_password: ['', Validators.required],
    password: ['', Validators.required],
    confirm_password: ['', Validators.required]
  })

  doChangePassword() {
    console.log(this.changePasswordForm.value);
    if(this.changePasswordForm.valid) {
      let dt: any = this.changePasswordForm.value;
      let data: ChangePasswordRequest = {} as ChangePasswordRequest; 
      data.current_password = dt.current_password; 
      data.password = dt.password;
      data.confirm_password = dt.confirm_password;
      
      console.log("data ", data);
      this.authService.changePassword(data).subscribe((resp) => {
        this.toastrService.success("Password Updated");
      }, error => {
        this.toastrService.error("Some error from backend", error.message);
      });
    }    
  }

}
