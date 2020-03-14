import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-login2',
  templateUrl: './login2.component.html',
  styleUrls: ['./login2.component.css']
})
export class Login2Component implements OnInit, OnDestroy {

  origBodyClass = '';

  constructor() { }

  ngOnInit(): void {
    this.origBodyClass = document.body.className;
    document.body.className = 'bg-gradient-primary';
  }

  ngOnDestroy(): void {
    document.body.className = this.origBodyClass;
  }

}
