import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProfileRequest, ProfileResponse } from 'src/app/interfaces/auth.interface';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileImageService } from 'src/app/services/profile-image.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  constructor( private fb: FormBuilder, private authService: AuthService, private profileImageService: ProfileImageService, 
    private toastrService: ToastrService ) {
    this.getProfile();
  }
  @ViewChild('fileInput') fileInput: ElementRef = {} as any;
  @ViewChild('profileImage') profileImage: ElementRef = {} as any;

  profileImageUrl: String = "/assets/user-avatar.png";
  profileData: ProfileResponse = {} as ProfileResponse;
  profileImageData: any = null;
  profileForm = this.fb.group({
    first_name: [''],
    last_name: [''],
    gender: [''],
    dob: ['']
  })

  getProfile() {
    this.authService.getProfile().subscribe((data) => {
      this.profileData = data;

      let dt = "";
      if(data.dob) {
        dt = (new Date(data.dob).toISOString().split("T"))[0];
      }
      // alert(JSON.stringify(data));
      this.profileForm.setValue({
        first_name: data.first_name,
        last_name: data.last_name,
        gender: data.gender,
        // dob: "2020-11-09"
        dob: dt
      });
      if(data.profile_picture) {
        this.profileImageUrl = "http://localhost:3000/" + data.profile_picture
      }
       
    }, error => {
      this.toastrService.error("Some error from backend", error.message);
    })
  }

  updateProfile() {
    console.log(this.profileForm.value);
    if(this.profileForm.valid) {
      let dt: any = this.profileForm.value;
      let data: ProfileRequest = {} as ProfileRequest; 
      data.first_name = dt.first_name; 
      data.last_name = dt.last_name;
      data.gender = dt.gender;
      data.dob = dt.dob;  
      
      console.log("data ", data);
      this.authService.editProfile(data).subscribe((resp) => {
        this.toastrService.success("Profile Updated");
      }, error => {
        this.toastrService.error("Some error from backend", error.message);
      });
    }    
  }

  uploadFileEvt(event: any) {
    if (event.target.files && event.target.files[0]) {
      // this.fileAttr = '';
      // Array.from(event.target.files).forEach((file: any) => {
      //   this.fileAttr += file.name + ' - ';
      // });
      // HTML5 FileReader API
      let reader = new FileReader();
      reader.onload = (e: any) => {
        let image = new Image();
        image.src = e.target.result;
        this.profileImage.nativeElement.src = e.target.result;
        image.onload = (rs) => {
          let imgBase64Path = e.target.result;
        };
      };
      reader.readAsDataURL(event.target.files[0]);
      this.profileImageData = event.target.files[0];
      // Reset if duplicate image uploaded again
      this.fileInput.nativeElement.value = '';
    } 
  }

  uploadProfileImage() {
    if(this.profileImageData !== null) {
      
      const formData = new FormData();
      formData.append('profileImage', this.profileImageData);

      this.authService.uploadProfileImage(formData).subscribe((resp) => {
        this.profileImageService.setValue(resp.profile_picture);
        
        if(localStorage.getItem("userdata")) {
          const userdatastr = localStorage.getItem("userdata");
          const userdata = JSON.parse(userdatastr || "");
          userdata.profile_picture = resp.profile_picture;
          localStorage.setItem("userdata", JSON.stringify(userdata));
          
        }

        this.toastrService.success("Profile Image Updated");
      }, error => {
        this.toastrService.error("Some error from backend", error.message);
      });
    }
  }

  
}
