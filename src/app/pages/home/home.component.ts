import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import * as AOS from 'aos';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  constructor(@Inject(DOCUMENT) private _document: Document
  ) { }

  ngOnInit (): void {
    AOS.init();
  }

  ngAfterViewInit () {

  }

  refreshPage () {
    this._document.defaultView.location.reload();
  }

}
