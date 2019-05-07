import { Component } from '@angular/core';

@Component({
  selector: 'layout-passport',
  templateUrl: './passport.component.html',
  styleUrls: ['./passport.component.less'],
})
export class LayoutPassportComponent {

  CompanyName:any;

  constructor(){
    if(WebConfig.CompanyName != null){
      this.CompanyName = WebConfig.CompanyName;
    }else{
      this.CompanyName = "xxx";
    }
  }

}
