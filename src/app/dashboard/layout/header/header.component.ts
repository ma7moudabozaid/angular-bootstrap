import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DOCUMENT } from "@angular/common";
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  show: boolean = false;

    // private htmlRoot = document.documentElement;
    currentDirection = localStorage.getItem('dir');

    constructor(
      public translate: TranslateService,
      private router: Router,
      @Inject(DOCUMENT) private document: Document

    ) {
      translate.setDefaultLang(localStorage.getItem('lang') || '');
      this.document.documentElement.setAttribute('dir', localStorage.getItem('dir') || '');
      this.translate.use(localStorage.getItem('lang') || '');

    }

    ngOnInit(): void {
      console.log('a')
    }


    changeLang() {
      if (this.currentDirection === 'ltr') {
        this.currentDirection = 'rtl';
        localStorage.setItem('dir', 'rtl');
        this.document.documentElement.setAttribute('dir', localStorage.getItem('dir') || '');
        localStorage.setItem('lang', 'ar');
        this.translate.use('ar');
      } else if (this.currentDirection === 'rtl') {
        this.currentDirection = 'ltr';
        localStorage.setItem('dir', 'ltr');
        this.document.documentElement.setAttribute('dir', localStorage.getItem('dir') || '');
        localStorage.setItem('lang', 'en');
        this.translate.use('en');
      }
    }

    logout(){

      localStorage.removeItem('Token')
      localStorage.removeItem('User')
      localStorage.removeItem('Token')
      this.router.navigate(['/']);

    }
  }
