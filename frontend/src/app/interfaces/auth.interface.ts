export interface SignupRequest {
    username: String;
    password: String;
    confirmPassword: String;
}

export interface SigninRequest {
    username: String;
    password: String;
}

export interface UserData {
    username: String;
    first_name: String;
    last_name: String;
    profile_picture: String;
}

export interface SigninResponse {
    token: string;
    userData: UserData;
}

export interface ProfileResponse {
    username: String;
    first_name: string;
    last_name: string;
    gender: string;
    dob: string;
    profile_picture: string;
    preferences?: Map<string, string>;
}

export interface ProfileRequest {
    first_name: string;
    last_name: string;
    gender: string;
    dob: string;
    preferences?: Map<string, string>;
}

export interface ChangePasswordRequest {
    current_password: string;
    password: string;
    confirm_password: string;
}