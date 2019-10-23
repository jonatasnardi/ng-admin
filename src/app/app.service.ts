import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Headers } from '@angular/http';
import { baseUrl } from './shared/shared.variables';
import { NgProgress } from '@ngx-progressbar/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AppService {
    prevPage: string = '';
    loaderIsActive: boolean = false;
    headerJson;
    requestOptionsJson;
    requestOptionsUrlEncoded;
    windowWidth;
    isUserLogged: boolean = localStorage.getItem(`isUserLogged`) ? true : false;
    bloodTypes: Array<any> = ['A+', 'A-', 'AB+', 'AB-', 'B-', 'B+', 'O-', '0+'];

    constructor(
        private http: Http,
        public ngProgress: NgProgress,
        public toastr: ToastrService,
        private router: Router
    ) {
        this.headerJson = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }

        this.requestOptionsJson = {
            headers: new Headers(this.headerJson),
        }

        this.requestOptionsUrlEncoded = {
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded',
                'Access-Control-Allow-Origin': '*'
            }),
        }
    }

    verificaValidacoesForm(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach((campo) => {
            var controle = formGroup.get(campo);
            controle.markAsTouched();
            if (controle instanceof FormGroup) {
                this.verificaValidacoesForm(controle);
            }
        });
    }

    updateHeaders() {
        this.headerJson = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }

        this.requestOptionsJson = {
            headers: new Headers(this.headerJson),
        }

        this.requestOptionsUrlEncoded = {
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded',
                'Access-Control-Allow-Origin': '*'
            }),
        }
     }

    getExample() {
        return this.http.get(`${baseUrl}api/Method`)
          .map(dados => dados.json());
    }

    normalizarString(a: string) {
        return a = a = a.replace(/[EÉÈÊË]/gi, "E"),
        a = a.replace(/[eéèêë]/gi, "e"),
        a = a.replace(/[AÀÁÂÃÄÅÆ]/gi, "A"),
        a = a.replace(/[aàáãâä]/gi, "a"),
        a = a.replace(/[cç]/gi, "c"),
        a = a.replace(/[IÌÍÎÏ]/gi, "I"),
        a = a.replace(/[iíìïî]/gi, "i"),
        a = a.replace(/[ÒÓÔÕÖ]/gi, "O"),
        a = a.replace(/[oóòôö]/gi, "o"),
        a = a.replace(/[UÜÛÙÚ]/gi, "U"),
        a = a.replace(/[uúùüû]/gi, "u")
    }

    getRandomNumber(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    isDesktop() {
        this.windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        return this.windowWidth >= 768 ? true : false;
    }

    isMobile() {
        this.windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        return this.windowWidth < 768 ? true : false;
    }

    parseObject(obj) {
        var newObj = '';
        let array = Object.getOwnPropertyNames(obj);
        $.each(array, (index, value) => { newObj += value + '=' + obj[value] + "&"})
        return newObj;
    }

    getUrlParameter(name, url) {
        if (!url) url = location.href;
        name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
        var regexS = "[\\?&]"+name+"=([^&#]*)";
        var regex = new RegExp( regexS );
        var results = regex.exec( url );
        return results == null ? null : results[1];
    }

    showProgressBar() {
        this.ngProgress.start();
        this.loaderIsActive = true;
    }

    hideProgressBar() {
        if(this.loaderIsActive)
            this.ngProgress.done();
            this.loaderIsActive = false;
    }

    showToastrSuccess(msg: string) {
        this.toastr.success(msg);
    }

    showToastrWarning(msg: string) {
        this.toastr.warning(msg);
    }

    showToastrError(msg: string) {
        this.toastr.error(msg);
    }

    createCookie(cookieName, cookieValue) {
        let now: any = new Date();
        let time = now.getTime();
        let expireTime = time + 10000 * 36000;
        now.setTime(expireTime);
        document.cookie = `${cookieName}=${cookieValue};expires=${now.toGMTString()};path=/`;
    }

    getCookie(name) {
        let value = "; " + document.cookie;
        let parts = value.split(`; ${name}=`);
        if (parts.length == 2) return parts.pop().split(";").shift();
    }

    destroyLogin() {
      localStorage.removeItem(`isUserLogged`);
      this.isUserLogged = false;
      this.router.navigate([`/login`]);
      setTimeout(() => {
        $('body').addClass('login');
      }, 0);
    }

    checkAuth() {
      if (!localStorage.getItem(`isUserLogged`)) {
        // this.destroyLogin();
      }
    }
}
