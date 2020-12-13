import { Component, OnInit } from '@angular/core';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.css']
})
export class AuthLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e) {
    let nav = document.querySelector('.navbar');
    let brandLogo = document.querySelector('.navbar-brand-text');
    let btn = document.querySelector('.navbar-nav .btn');

    if (window.pageYOffset > nav.clientHeight) {
      nav.classList.add('navbar-inverse');
      brandLogo.classList.add('brandLogo-inverse');
      btn.classList.add('btn-inverse');
    } else {
      nav.classList.remove('navbar-inverse');
      brandLogo.classList.remove('brandLogo-inverse');
      btn.classList.remove('btn-inverse');
    }
  }
}
