import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChangePasswordRequest, ProfileRequest, ProfileResponse, SigninRequest, SigninResponse, SignupRequest } from '../interfaces/auth.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authUrl: string = environment.AUTH_API_HOST;

  constructor(private httpClient: HttpClient,) { }

  public doSignUp(signupRequest: SignupRequest): Observable<SignupRequest[]> {
    return this.httpClient.post<SignupRequest[]>(this.authUrl + '/signup', signupRequest);
  }

  public doSignIn(signinRequest: SigninRequest): Observable<SigninResponse> {
    return this.httpClient.post<SigninResponse>(this.authUrl + '/signin', signinRequest);
  }

  public editProfile(profileRequest: ProfileRequest): Observable<ProfileResponse> {
    return this.httpClient.patch<ProfileResponse>(this.authUrl + '/profile', profileRequest);
  }

  public changePassword(changePasswordRequest: ChangePasswordRequest): Observable<ProfileResponse> {
    return this.httpClient.patch<ProfileResponse>(this.authUrl + '/change-password', changePasswordRequest);
  }

  public getProfile(): Observable<ProfileResponse> {
    return this.httpClient.get<ProfileResponse>(this.authUrl + '/profile');
  }

  public uploadProfileImage(data: FormData): Observable<ProfileResponse> {
    return this.httpClient.put<ProfileResponse>(this.authUrl + "/profile-image", data);
  }
  
  

}
