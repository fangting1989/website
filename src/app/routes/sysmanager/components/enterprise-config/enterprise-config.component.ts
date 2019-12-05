import { Component, OnInit, Input ,ViewChild,ElementRef} from '@angular/core';
import { NzMessageService, UploadFile ,NzModalService } from 'ng-zorro-antd';
import { sysmanagerServices } from '../../services';
import { DomSanitizer,SafeUrl} from "@angular/platform-browser";
import {Router,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-enterprise-config',
  templateUrl: './enterprise-config.component.html',
  styleUrls: ['./enterprise-config.component.scss']
})
export class EnterpriseConfigComponent implements OnInit {

  stateArray = [{name:"是",value:1,selected:false},{name:"否",value:0,selected:true}]
  smsmodel:any = {}
  enterpriseid:any = null;
  constructor(
    private msg:NzMessageService,
    private sysmanagerServices:sysmanagerServices,
    private sanitizer:DomSanitizer,
    private route:ActivatedRoute,
  ) { }

  ngOnInit() {
    //
    this.enterpriseid = this.route.snapshot.queryParams["keycode"];
    this.loadSmsData();
  }


  /*短信相关 */
  loadSmsData(){
    var postData = {
      objecttype:10,
      enterpriseid:this.enterpriseid
    }
    this.sysmanagerServices.tenterpriseconfigList(postData).subscribe(result => {
      if(result && result.data.length > 0){
        this.smsmodel = JSON.parse(result.data[0].content)
        this.smsmodel.isdefault = result.data[0].isdefault 
        this.smsmodel.keycode = result.data[0].keycode
      }
    })

  }
  saveSmsClick(){
    this.smsmodel.content = JSON.stringify({
      appid:this.smsmodel.appid,
      appkey:this.smsmodel.appkey,
      template:this.smsmodel.template
    })
    this.smsmodel.enterpriseid = this.enterpriseid
    this.smsmodel.objecttype = 10
    if(this.smsmodel.keycode){
      this.sysmanagerServices.tenterpriseconfigUp(this.smsmodel).subscribe(result => {
        if(result){
          this.msg.success("保存成功!")
        }
      })
    }else{
      this.sysmanagerServices.tenterpriseconfigIn(this.smsmodel).subscribe(result => {
        if(result){
          this.msg.success("保存成功!")
        }
      })
    }
    
  }
}
