import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-testdemo',
  templateUrl: './testdemo.component.html',
  styles: []
})
export class TestdemoComponent implements OnInit {

  constructor() { }

  title:any = '';
  subtitle:any = ''
  ngOnInit() {
  }

}
