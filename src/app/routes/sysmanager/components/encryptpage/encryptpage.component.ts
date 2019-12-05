import { Component, OnInit } from '@angular/core';
import { sysmanagerServices } from '../../services';
import {Utils} from './../../../../shared/utils/utils';
@Component({
  selector: 'app-encryptpage',
  templateUrl: './encryptpage.component.html',
  styles: []
})
export class EncryptpageComponent implements OnInit {

  model:any = {}
  constructor(
    private sysmanagerServices:sysmanagerServices
  ) { }

  ngOnInit() {
  }


  saveClick(){
    var postData:any = {}
    if( Utils.IsStringNullOrEmpty(this.model.content)){
      postData.data = this.model.jiami
      postData.type = 2;
    }else{
      
      postData.data = this.model.content
      postData.type = 1;
    }
    this.sysmanagerServices.encrypt(postData).subscribe(result=>{
      if(result){
        if(postData.type == 2){
          this.model.content = result.data
        }else{
          this.model.jiami = result.data
        }
      }
    })
  }
}
