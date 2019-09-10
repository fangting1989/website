import { Component, OnInit,Input,Output ,OnDestroy,EventEmitter} from '@angular/core';
import { SFSchema } from '@delon/form';
import { NzMessageService } from 'ng-zorro-antd';
import { dataServices } from '../../../services';
import { comservices } from '../../../../../shared/services';

@Component({
  selector: 'app-gytx-edit',
  templateUrl: './gytx-edit.component.html',
  styleUrls: ['./gytx-edit.component.scss']
})
export class GytxEditComponent implements OnInit {

  componentmode:any = 'edit';

  ContentData:any = {}
  submitting:any = false;
  data:any = {}
  model:any = {
    webcoretype:20
  }
  EnterPriseCode: any;
  constructor(public msg: NzMessageService,
    private comservices: comservices,
    private dataServices:dataServices) { 
      this.EnterPriseCode = comservices.getEnterPrise
    }

  ngOnInit() {
    this.loadData();
  }

  loadData(){
    var postData = {
      webcoretype:20
    }
    this.dataServices.twebcoreList(postData).subscribe(result => {
      if (result != null) {
        if(result.data.length > 0){
          this.model = result.data[0]
        }
      }
      
    })
  }

  keyupHandler(event) {
      this.model.webcorecontent = event
  }

  saveClick(){
    if(this.submitting){
      return;
    }
    this.submitting = true;
    if(this.model.keycode){
      this.dataServices.twebcoreUp(this.model).subscribe(result => {
        this.submitting  = false;
        if (result != null) {
          this.model = result.data;
          this.msg.success("保存成功!");
        }
      })
    }else{
      this.dataServices.twebcoreIn(this.model).subscribe(result => {
        this.submitting  = false;
        if (result != null) {
          this.model = result.data
          this.msg.success("保存成功!");
        }
      })
    }
    //保存内容
    
  }
}


