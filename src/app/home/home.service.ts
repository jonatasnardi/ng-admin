import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from '../shared/shared.variables';
import { AppService } from '../app.service';

@Injectable()
export class HomeService {

  constructor(
    private http: HttpClient,
    private appService: AppService
  ) { }

  getExample() {
    return this.http.get(`${baseUrl}url`, this.appService.requestOptionsUrlEncoded)
  }

}
