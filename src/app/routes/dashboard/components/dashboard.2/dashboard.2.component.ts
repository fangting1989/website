import { Component, OnInit,ElementRef } from '@angular/core';

@Component({
  selector: 'app-dashboard_2',
  templateUrl: './dashboard.2.component.html',
  styleUrls: ['./dashboard.2.component.scss']
})
export class Dashboard_2Component implements OnInit {

  constructor() { }

  ngOnInit() {
  }


  render(el: ElementRef) {
    // 开始编写 G2 代码
    var data = [{
      year: '1991',
      value: 3
    }, {
      year: '1992',
      value: 4
    }, {
      year: '1993',
      value: 3.5
    }, {
      year: '1994',
      value: 5
    }, {
      year: '1995',
      value: 4.9
    }, {
      year: '1996',
      value: 6
    }, {
      year: '1997',
      value: 7
    }, {
      year: '1998',
      value: 9
    }, {
      year: '1999',
      value: 13
    }];
    var chart = new G2.Chart({
      container: el.nativeElement,
      forceFit: true,
      height: window.innerHeight
    });
    chart.source(data);
    chart.scale('value', {
      min: 0
    });
    chart.scale('year', {
      range: [0, 1]
    });
    chart.tooltip({
      crosshairs: {
        type: 'line'
      }
    });
    chart.line().position('year*value');
    chart.point().position('year*value').size(4).shape('circle').style({
      stroke: '#fff',
      lineWidth: 1
    });
    chart.render();

  }

}
