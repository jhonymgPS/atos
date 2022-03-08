import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validator, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {User} from "../../models/login.model";
import {catchError} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  hide = true;
  loginError !: string;
  loginForm !: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private snackBar: MatSnackBar
) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]]
    });
  }

  login() {
    if (!this.loginForm.invalid){
      this.authService.login(this.loginForm.getRawValue()).then(
        (credential) => {
          this.authService.storeUser(credential.user.uid);
          this.router.navigateByUrl('/countries');
        }
      ).catch(
          (error) => {
            console.log(error)
            this.snackBar.open(this.getErrorMessage(error.code), "x",{
              duration: 1500
            });
          }
        );
    }
  }

  getErrorMessage(code: string): string{
    switch (code) {
      case "auth/invalid-email":
        return "Email invalido";
      case "auth/wrong-password":
        return "Contraseña incorrecta";
      case "auth/user-disabled":
        return "Usuario desactivado";
      default:
        return "Error desconocido: " + code;
    }
  }
}
