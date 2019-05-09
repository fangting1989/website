import { Component, OnInit } from '@angular/core';
import { NzMessageService,NzModalService } from 'ng-zorro-antd';
import { dataServices } from '../../../services';
import { Enums } from './../../../../../shared/utils/enums';
import { comservices } from '../../../../../shared/services';
import { UUID } from 'angular2-uuid';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {_} from 'underscore'
import { Utils} from './../../../../../shared/utils/utils';
import * as moment from  'moment'

@Component({
  selector: 'app-model-edit',
  templateUrl: './model-edit.component.html',
  styles: []
})
export class ModelEditComponent implements OnInit {
  model: any = {}
  EnterPriseCode:any = {}
  submitting:any = false;
  changeHeight:any = 0;
  modelCode:any = "";
  sourceurl:any = "#";
  data:any;
  constructor(private msg: NzMessageService,
    private dataServices: dataServices,
    private comservices: comservices,
    private modalService:NzModalService,
    private route: ActivatedRoute
  ) {
    this.EnterPriseCode = comservices.getEnterPrise
    this.changeHeight = window.innerHeight - 65-10;
  }

  ngOnInit() {
    this.modelCode = this.route.snapshot.queryParams["modelId"];
    this.sourceurl = "http://localhost:8400/#/editor/"+this.modelCode;
  }

  saveClick() {
    // var self = this;
    // if(Utils.IsStringNullOrEmpty(this.model.name) || Utils.IsStringNullOrEmpty(this.model.key) ){
    //   this.msg.error("请输入正确的信息!");
    //   return;
    // }
    // if(this.submitting){
    //     return
    // }
    // this.submitting = true;
    // var self = this;
    // this.model.modelType = 0
    // this.dataServices.model_create(this.model).subscribe(result => {
    //   this.submitting = false
    //   if (result != null) {
    //     self.model = result.data;
    //     self.msg.success("操作成功!");
    //     self.closeModal();
    //   }
    // })
  }
}
