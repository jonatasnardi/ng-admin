import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { LoginService } from './login.service';
import { AppService } from '../app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  formRecover: FormGroup;
  verifyLoader: boolean;
  login: string;
  password: string;

  constructor(
    public router: Router,
    public appService: AppService,
    public loginService: LoginService,
    private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.appService.destroyLogin();
    this.appService.hideProgressBar();

    this.formLogin = this.formBuilder.group({
      login: [this.login, [Validators.required, Validators.email]],
      password: [this.password, [Validators.required, Validators.minLength(2)]]
    });

    this.formRecover = this.formBuilder.group({
      email: [this.login, [Validators.required, Validators.email]],
    });
  }

  openModalForgotPassword() {
    (<any>$('#modelForgotPassword')).modal('show');
  }

  onSubmit() {

    if (this.formLogin.valid) {
      this.verifyLoader = true;
      this.loginService.authentication(this.formLogin.value)
        .subscribe(data => {
          localStorage.setItem(`isUserLogged`, 'true');
          this.appService.isUserLogged = true;
          this.router.navigate(['/dashboard']);
        },
        (error: any) => {
          if (error.error.errors) {
            const errorMessage = error.error.errors[0];
            this.appService.showToastrError(errorMessage);
          } else {
            this.appService.showToastrError(`Ocorreu um erro inesperado. Tente novamente mais tarde`);
          }
          this.verifyLoader = false
        });
    } else { // invalid form
      this.appService.showToastrWarning(`Existem campos inválidos no formulário.`);
      $('input.ng-invalid').eq(0).focus();
      this.appService.verificaValidacoesForm(this.formLogin);
    }
  }

  onRecoverPassword() {
    if (this.formRecover.valid) {
      this.appService.showProgressBar();

      this.loginService.requestChangePassword()
        .subscribe(data => {
          this.appService.hideProgressBar();
          (<any>$('#modelForgotPassword')).modal('hide');
          this.appService.showToastrSuccess(`Foi enviado um email para prosseguir com o processo de recuperação de senha.`);
        },
        (error: any) => {
          this.appService.hideProgressBar();
          if (error.error.errors) {
            const errorMessage = error.error.errors[0];
            this.appService.showToastrError(errorMessage);
          } else {
            this.appService.showToastrError(`Ocorreu um erro inesperado. Tente novamente mais tarde`);
          }
        });
    } else { // invalid form
      this.appService.hideProgressBar();
      this.appService.showToastrWarning(`Insira um email válido.`);
      $('input.ng-invalid').eq(0).focus();
      this.appService.verificaValidacoesForm(this.formLogin);
    }

  }

}
