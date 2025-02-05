import { Component } from '@angular/core';
import {AuthenticationRequest} from "../services/models/authentication-request";
import {AuthenticationService} from "../services/services/authentication.service";
import {Router} from "@angular/router";
import {TokenService} from "../services/token/token.service";
import {UserService} from "../services/services/user.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
    standalone: false
})
export class LoginComponent {
 authReq : AuthenticationRequest={password:'',username:''}
    errorMsg: Array<any> = [];
 constructor(private authService:AuthenticationService , private router: Router,
    private TokenService:TokenService,
    private userService:UserService,
) {}


    login() {
        this.errorMsg = [];
        const username = this.authReq.username;
        this.authService.authentication({
            body: this.authReq
        }).subscribe({
            next: (res) => {
                this.TokenService.token = res.accessToken as string;
                this.userService.getUserDetails(<string> username).subscribe({
                    next: (userDetails) => {
                        localStorage.setItem('user', JSON.stringify(userDetails));
                        this.router.navigate(['dashboard']);
                    }
                });
            }
        });

    }


    register(){
     this.router.navigate(['register']);
  }
}
