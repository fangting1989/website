import { Component, ChangeDetectionStrategy } from '@angular/core';
import { SettingsService } from '@delon/theme';
import { environment } from '@env/environment';
import { GlobalState } from '../../../core/common/global.state';
import { _ } from 'underscore';
import {defaultServices} from '../../services/defaultService';
import {comservices} from '../../../shared/services/comservices';
@Component({
  selector: 'layout-header',
  templateUrl: './header.component.html',
  styleUrls: ['./head.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  searchToggleStatus: boolean;
  headTitle :any = "";
  NavArray: any = [];

  constructor(public settings: SettingsService,
    private _state: GlobalState,
    private dataServices:defaultServices,
    private comservices:comservices) {
    

    this.loadSystemName();

    this.NavArray.push({ level: 0, NavName: "首页", routerLink: "/dashboard" })
    var self = this;
    //接收面包屑
    this._state.subscribe('app.nav',"e9c11b4b-5b48-45b4-b026-61b865875d21", (navObj) => {
      //去除
      this.NavArray = _.filter(this.NavArray, function (obj) { return obj.level < navObj.level; });
      var Index = _.findIndex(this.NavArray, { "level": navObj.level });
      if (Index > -1)
        self.NavArray.splice(Index, 1);
      self.NavArray.push(navObj);
      self.NavArray.sort(function (a, b) {
        return a.level - b.age
      });
    });
      
   }



  toggleCollapsedSidebar() {
    this.settings.setLayout('collapsed', !this.settings.layout.collapsed);
  }

  searchToggleChange() {
    this.searchToggleStatus = !this.searchToggleStatus;
  }

  loadSystemName(){
    var self =this;
    if(!this.comservices.getEnterPrise){
      try{
        if(WebConfig.headTitle){
          this.headTitle =WebConfig.headTitle
        }
      }catch(e){
        this.headTitle = "后台内容管理"
      }
      return;
    }
    var postData = {
      enterpriseid:this.comservices.getEnterPrise
    }
    this.dataServices.enterprise(postData).subscribe(result => {
      if(result && result.data && result.data.systemname){
        self.headTitle = result.data.systemname
      }else{
        try{
          if(WebConfig.headTitle){
            this.headTitle =WebConfig.headTitle
          }
        }catch(e){
          this.headTitle = "后台内容管理"
        }
      }
    })
  }

  
}
