import { Component, OnInit, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  menuOpened: boolean = false;
  constructor(
    private _router: Router,
    public appService: AppService
  ) { }

  ngOnInit() {
  }

  openMenu() {
    this.menuOpened = !this.menuOpened;
    var ANIMATION_DELAY: number = 0;
    $('.menu__link').css('opacity', '1');

    $('.menu__link').each((i, obj) => {
        ANIMATION_DELAY += 0.08;
    });
  }

  routeChange() {
    this.menuOpened = false;
  }

  logout() {
    this.appService.destroyLogin();
  }

}
