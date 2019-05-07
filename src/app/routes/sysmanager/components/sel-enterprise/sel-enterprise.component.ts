import { Component, OnInit } from '@angular/core';
import { sysmanagerServices } from '../../services';
import { NzMessageService, NzModalService,NzModalRef } from 'ng-zorro-antd';
import { CacheService } from '@delon/cache'

@Component({
  selector: 'app-sel-enterprise',
  templateUrl: './sel-enterprise.component.html',
  styleUrls: ['./sel-enterprise.component.scss']
})
export class SelEnterpriseComponent implements OnInit {

  PageNum:any = 1;
  PageSize:any = 10;
  DataList:any = []
  searchObject:any = {}


  constructor(
    private sysmanagerServices:sysmanagerServices,
    public msg: NzMessageService,
    private cacheService:CacheService,
    private modal:NzModalRef
  ) { }
 
  ngOnInit() {
    this.loadData();
  }

  SearchClick(e){ 

  }
  loadData(){
    var self = this;
    var postData = {
      pagesize:this.PageSize,
      pagenum:this.PageNum,
      searchtext:this.searchObject.searchText
    }
    this.sysmanagerServices.enterpriseList(postData).subscribe(result => {
      if (result != null) {
        self.DataList = result.data;
      }
    })
  }

  selItem(item){
    var object = {
      enterprisename:item.enterprisename,
      keycode:item.keycode
    }
    this.cacheService.set(WebConfig.EnterPriseCookie.name,object,
      {type:WebConfig.EnterPriseCookie.type,expire:WebConfig.EnterPriseCookie.expire})
    
    this.modal.close(true);
    this.modal.destroy();
  }
}
