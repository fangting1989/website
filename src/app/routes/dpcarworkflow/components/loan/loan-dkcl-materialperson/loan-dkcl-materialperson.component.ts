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
  selector: 'dpworksiteservices-loan-dkcl-materialperson',
  templateUrl: './loan-dkcl-materialperson.component.html',
  styles: []
})
export class LoanDkclMaterialpersonComponent extends WorkflowBaseComponent implements OnInit {
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
        {name:'财产分割协议',indexnum:1,type:'dkcl-ccmgxy'},
        {name:'单身证明',indexnum:2,type:'dkcl-dszm'},
        {name:'户口本',indexnum:3,type:'dkcl-hkb'},
        {name:'收入证明',indexnum:4,type:'dkcl-srzm'},
        {name:'银行流水',indexnum:5,type:'dkcl-yhls'},
        {name:'银行流水结息页',indexnum:6,type:'dkcl-yhlsjxy'},
        {name:'居住证明',indexnum:7,type:'dkcl-jzzm'},
        {name:'购房发票',indexnum:8,type:'dkcl-gffp'},
        {name:'保证函',indexnum:9,type:'dkcl-bzh'},
        {name:'股东会同意抵押决议书',indexnum:10,type:'dkcl-gdhtydyjys'},
        {name:'挂靠协议',indexnum:11,type:'dkcl-gkxy'},
        {name:'驾驶证',indexnum:12,type:'dkcl-jsz'},
        {name:'士兵证',indexnum:13,type:'dkcl-sbz'},
        {name:'离婚证',indexnum:14,type:'dkcl-lhz'},
        {name:'结婚证',indexnum:15,type:'dkcl-jhz'},
        {name:'房产证',indexnum:16,type:'dkcl-fcz'},
        {name:'土地证',indexnum:17,type:'dkcl-tdz'},
        {name:'契证',indexnum:18,type:'dkcl-qz'},
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

