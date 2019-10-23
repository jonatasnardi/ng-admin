import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NgProgress } from '@ngx-progressbar/core';
import 'rxjs/Rx';
import { AppService } from './app.service';
declare var $: any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public urlAtual: string = '';
  currentPage: string = '';
  isAdmin: boolean = false;
  showFooter: boolean = true;
  homePage: boolean = false;
  showHeader: boolean = false;
  currentYear: number = new Date().getFullYear();

  constructor(
    private _router: Router,
    public progress: NgProgress,
    public appService: AppService
  ) { }

  ngOnInit() {
    this._router.events.subscribe((event) => {
      $('body').removeClass();

      if (event instanceof NavigationEnd) {
        this.checkGuards(event.url);
        this.appService.prevPage = this.currentPage;
        this.currentPage = event.url;
        this.showFooter = true;
        $(function () {
          (<any>$('[data-toggle="tooltip"]')).tooltip();
        });
        if(event.url != '/dashboard') {
          this.appService.prevPage = event.url;
        }

        this.urlAtual = event.url;
        window.scrollTo(0, 0);

        if (event.url == '/login') {
          $('body').addClass('login');
          setTimeout(() => {
            $('body').addClass('login');
          }, 0);
          this.showHeader = false;
          this.showFooter = false;
        } else if (event.url.indexOf('dashboard') > -1) {
          this.homePage = true;
          this.showFooter = true;
          this.showHeader = true;
        } else {
          this.homePage = false;
          this.showFooter = true;
          this.showHeader = true;
        }
      }
    });
  }

  checkGuards(route) {
    if (
      route != '/login' &&
      route != '/register' &&
      route != '/register-patient'
      ) {
      this.appService.checkAuth();
    }
  }
}
