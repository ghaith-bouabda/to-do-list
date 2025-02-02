import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../services/services/authentication.service";
import {RegisterRequest} from "../services/models/register-request";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {

    constructor(private router: Router,
                private authService: AuthenticationService) {
    }
    registerRequest: RegisterRequest = {email: '', username:'', password: ''};

    register(){
        this.authService.register({
            body: this.registerRequest
        }) .subscribe({
            next: () => {
                this.router.navigate(['login']);
            }
        });

    }

}
