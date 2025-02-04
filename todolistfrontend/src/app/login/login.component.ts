import { Component } from '@angular/core';
import {AuthenticationRequest} from "../services/models/authentication-request";
import {AuthenticationService} from "../services/services/authentication.service";
import {Router} from "@angular/router";
import {TokenService} from "../services/token/token.service";

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
    private TokenService:TokenService
) {
 }
    login() {
        this.errorMsg = [];
        this.authService.authentication({
            body: this.authReq
        }).subscribe({
            next: (res) => {
                this.TokenService.token = res.accessToken as string;

                this.router.navigate(['dashboard']);
            }
        });
    }


    register(){
     this.router.navigate(['register']);
  }
}
