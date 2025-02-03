import { Component } from '@angular/core';
import {AuthenticationRequest} from "../services/models/authentication-request";
import {AuthenticationService} from "../services/services/authentication.service";
import {Router} from "@angular/router";
import {AuthenticationResponse} from "../services/models/authentication-response";
import {TokenService} from "../services/token/token.service";
import {register} from "../services/fn/authentication/register";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
 authReq : AuthenticationRequest={password:'',username:''}
    errorMsg: Array<any> = [];
 constructor(private authservice :  AuthenticationService , private router: Router,
    private TokenService:TokenService
) {
 }
    login() {
        this.errorMsg = [];
        this.authservice.authentication({
            body: this.authReq
        }).subscribe({
            next: (res) => {

                this.TokenService.token = res.accessToken as string;
                console.log(res.accessToken);
                console.log(this.TokenService.token);
                this.router.navigate(['dashboard']);
            }
        });
    }


    register(){
     this.router.navigate(['register']);
  }
}
