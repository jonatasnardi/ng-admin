import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from "rxjs/operators";
import { baseUrl } from '../shared/shared.variables';
import { AppService } from '../app.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  _serviceAuthentication: string = `${baseUrl}loginSetorPesquisa`;

  constructor(
    public _http: HttpClient,
    public appService: AppService
  ) { }

  authentication(body) {
    return this._http.post(`${baseUrl}/Login/SignIn`, body, this.appService.requestOptionsUrlEncoded);
  }

  requestChangePassword() {
    return this._http.get(`${baseUrl}/Login/RequestChangePassword`, this.appService.requestOptionsUrlEncoded);
  }
}
