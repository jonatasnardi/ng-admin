// Imports of libs
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Import of modules, components and services
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [ HeaderComponent, FooterComponent ],
  declarations: [ HeaderComponent, FooterComponent ]
})
export class SharedModule { }
