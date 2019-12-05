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
import {MaterialSaveComponent} from '../../../basecomponents/material-save/material-save.component';

@Component({
  selector: 'dpworksiteservices-loan-smcl-materialother',
  templateUrl: './loan-smcl-materialother.component.html',
  styles: []
})
export class LoanSmclMaterialotherComponent  extends WorkflowBaseComponent implements OnInit {
  @ViewChild('materialcomponent') materialcomponent:MaterialSaveComponent

  proctask:any;
  materialname:any = 'smcl-other-material'
  EnterPriseCode:any;

  constructor(public msg: NzMessageService,
    private modalHelper:ModalHelper,
    private modalService:NzModalService,
    private dataServices:dataServices,
    private comservices:comservices,
    public elementRef:ElementRef,) { 
      super(elementRef);
      this.EnterPriseCode = comservices.getEnterPrise
    }

  ngOnInit() {
    this.proctask = this.task
    //加载数据
  }

  saveClick(){
    //调用保存方法
    this.materialcomponent.saveClick()
  }
}

