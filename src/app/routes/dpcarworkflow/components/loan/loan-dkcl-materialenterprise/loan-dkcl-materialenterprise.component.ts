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
  selector: 'dpworksiteservices-loan-dkcl-materialenterprise',
  templateUrl: './loan-dkcl-materialenterprise.component.html',
  styles: []
})
export class LoanDkclMaterialenterpriseComponent extends WorkflowBaseComponent implements OnInit {
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
        {name:'营业执照正本',indexnum:1,type:'dkcl-qy-yyzzzb'},
        {name:'营业执照副本',indexnum:2,type:'dkcl-qy-yyzzfb'},
        {name:'税务登记证正本',indexnum:3,type:'dkcl-qy-swdkzzb'},
        {name:'组织机构代码证正本',indexnum:4,type:'dkcl-qy-zzjgdmzzb'},
        {name:'验资报告',indexnum:5,type:'dkcl-qy-yzbg'},
        {name:'财务报表',indexnum:6,type:'dkcl-qy-cwbb'},
        {name:'公司章程',indexnum:7,type:'dkcl-qy-gszc'},
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

