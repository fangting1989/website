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
  selector: 'dpworksiteservices-loan-smcl-material',
  templateUrl: './loan-smcl-material.component.html',
  styles: []
})
export class LoanSmclMaterialComponent extends WorkflowBaseComponent implements OnInit {
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
    this.materiallist = [{
      indexnum:1,
      list:[
        {name:'借款人与业务员合影',indexnum:1,type:'smcl-jkryyywhy'},
      ]
    },
    {
      indexnum:2,
      list:[
        {name:'小区外观',indexnum:1,type:'smcl-xqwg'},
        {name:'单元楼照片',indexnum:2,type:'smcl-dylzp'},
        {name:'门牌照片',indexnum:3,type:'smcl-mpzp'},
        {name:'客厅照片',indexnum:4,type:'smcl-ktzp'},
        {name:'借款人与住宅合影',indexnum:5,type:'smcl-jkryzzhy'},
        {name:'生产型公司名称照片',indexnum:6,type:'smcl-scxgzmczp'},
        {name:'生产型生产场地',indexnum:7,type:'smcl-scpsccd'},
        {name:'生产型仓库照片',indexnum:8,type:'smcl-scxckzp'},
        {name:'借款人与生产型公司合影',indexnum:9,type:'smcl-jkryscxgshy'},
      ]
    },
    {
      indexnum:3,
      list:[
        {name:'贸易型公司名称照片',indexnum:1,type:'smcl-myxgsmczp'},
        {name:'贸易型公司场地',indexnum:2,type:'smcl-myxgscd'},
        {name:'借款人与贸易公司型公司合影',indexnum:3,type:'smcl-jkrymyxgshy'},
      ]
    }]
    this.proctask = this.task
  }

  saveClick(){

    
    //保存图片
    this.materialimage.saveClick();
  }

}

