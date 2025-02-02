import { Component } from '@angular/core';
import {AuthenticationRequest} from "../services/models/authentication-request";
import {AuthenticationService} from "../services/services/authentication.service";
import {Router} from "@angular/router";
import {AuthenticationResponse} from "../services/models/authentication-response";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
 authReq : AuthenticationRequest={username:'',password:''}
    errorMsg: Array<any> = [];
 constructor(private authservice :  AuthenticationService , private router: Router) {
 }
    login() {
        this.errorMsg= [];
        this.authservice.authentication({
            body: this.authReq,

        }).subscribe
        ({next:(response: AuthenticationResponse)=>{

            //save the token
            this.router.navigate(['dashboard']);

        }
        })
    }
}
