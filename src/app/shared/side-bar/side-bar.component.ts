import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  link: any;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.link = this.router.url;
    this.router.events.subscribe((val: any) => {
      this.link = val.url;
    })
  }

}
