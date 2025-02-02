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
 authReq : AuthenticationRequest={username:'',password:''}
    errorMsg: Array<any> = [];
 constructor(private authservice :  AuthenticationService , private router: Router,
    private TokenService:TokenService
) {
 }
    login() {
        this.errorMsg= [];
        this.authservice.authentication({
            body: this.authReq,

        }).subscribe
        ({next:(response: AuthenticationResponse)=>{

                this.TokenService.token= response.accessToken as string;
                this.router.navigate(['dashboard']);

        }
            ,
            error: (err) => {
                console.log(err);
                if (err.error.validationErrors) {
                    this.errorMsg = err.error.validationErrors;
                } else {
                    this.errorMsg.push(err.error.errorMsg);
                }
            }
        })
    }

  register(){
     this.router.navigate(['register']);
  }
}
