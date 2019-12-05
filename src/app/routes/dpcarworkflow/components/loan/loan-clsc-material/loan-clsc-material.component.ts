import { Component, OnInit,Input,ElementRef,ViewChild } from '@angular/core';
import { NzMessageService,NzModalService } from 'ng-zorro-antd';
import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { ModalHelper } from '@delon/theme';
import {GlobalState} from '../../../../../core/common';
import { dataServices } from '../../../services';
import {_} from 'underscore';
import { forkJoin, of, interval } from 'rxjs';
import { comservices,dataServices as baseservice } from '../../../../../shared/services';
import {WorkflowBaseComponent} from './../../../../../shared/components';
import {MaterialImagebaseComponent} from './../../../basecomponents/material-image/material-image.component';

@Component({
  selector: 'dpworksiteservices-loan-clsc-material',
  templateUrl: './loan-clsc-material.component.html',
  styles: []
})
export class LoanClscmaterialComponent extends WorkflowBaseComponent implements OnInit {
  @ViewChild('materialimage') materialimage:MaterialImagebaseComponent

  proctask:any;
  EnterPriseCode:any;
  model:any = {}
  usertype:any = 10;

  materiallist:any = []

  constructor(
    public msg: NzMessageService,
    private modalHelper:ModalHelper,
    private modalService:NzModalService,
    private dataServices:dataServices,
    private comservices:comservices,
    public elementRef:ElementRef,
  ) {
    super(elementRef);
    this.EnterPriseCode = comservices.getEnterPrise
   }

  ngOnInit() {
    var material = {
      indexnum:1,
      list:[
        {name:'抵押合同',indexnum:1,type:'clsc-dyht'},
        {name:'签约照片',indexnum:2,type:'clsc-qyzp'},
        {name:'完整合同',indexnum:3,type:'clsc-wzht'},
        {name:'借款合同',indexnum:4,type:'clsc-jkht'},
        {name:'专项分期付款申请表',indexnum:5,type:'clsc-zxfqfksqb'},
        {name:'三合人新合同(牡丹信用卡透支分期、抵押合同)',indexnum:6,type:'clsc-shrxht'},
        {name:'共同还款承诺书',indexnum:7,type:'clsc-gthkcns'},
        {name:'汽车销售合同',indexnum:8,type:'clsc-qcxsht'},
        {name:'担保承诺函',indexnum:9,type:'clsc-dbcnh'},
        {name:'代领委托授权书（三合一）',indexnum:10,type:'clsc-dlwtsqs'},
        {name:'购车分期付款手续费委托代扣授权书',indexnum:11,type:'clsc-gcfqfksxfwtdkxys'},
        {name:'首付款凭证',indexnum:12,type:'clsc-sfkpz'},
        {name:'银行卡签购单',indexnum:13,type:'clsc-yhkqgd'},
      ]
    }
    this.materiallist.push(material);
    this.proctask = this.task
  }

  saveClick(){

    
    //保存图片
    this.materialimage.saveClick();
  }

}
