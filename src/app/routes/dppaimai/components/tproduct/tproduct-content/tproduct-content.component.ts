import { Component, OnInit,Input,Output ,OnDestroy,EventEmitter} from '@angular/core';
import { SFSchema } from '@delon/form';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { dataServices } from '../../../services';
import { comservices } from '../../../../../shared/services';

@Component({
  selector: 'paimai-tproduct-content',
  templateUrl: './tproduct-content.component.html',
  styleUrls: ['./tproduct-content.component.scss']
})
export class TproductContentComponent implements OnInit{

  componentmode:any = 'edit';

  ContentData:any = {}
  submitting:any = false;
  data:any = {}
  model:any = {}
  EnterPriseCode: any;
  constructor(public msg: NzMessageService,
    private modal: NzModalRef,
    private comservices: comservices,
    private dataServices:dataServices) { 
      this.EnterPriseCode = comservices.getEnterPrise
    }

  ngOnInit() {
    if (this.data) {
      if (!this.data.HeadText) {
        this.data.HeadText = "内容编辑"
      }
      if (this.data.itemdata) {
        this.model = Object.assign({}, this.data.itemdata);
        if(this.model.componentmode){
          this.componentmode = this.model.componentmode
        }
      }
    }else{
      this.msg.error("对不起,参数错误！");
    }
  }

  keyupHandler(event) {
      this.model.productcontent = event
  }

  saveClick(){
    if(this.submitting){
      return;
    }
    this.submitting = true;
    var postData = {
      keycode:this.model.keycode,
      productcontent:this.model.productcontent,
      enterpriseid:this.EnterPriseCode
    }
    //保存内容
    this.dataServices.tproductUp(postData).subscribe(result => {
      this.submitting  = false;
      if (result != null) {
        this.data.itemdata.productcontent = result.productcontent;
        this.msg.success("保存成功!");
      }
    })
  }

  cancelClick(){
    this.closeModal();
  }
  
  closeModal() {
    this.modal.close(true);
    this.modal.destroy();
  }
}
