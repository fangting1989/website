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
import {LoanpersonbaseComponent} from './../../../basecomponents/loanperson/loanperson.component';
@Component({
  selector: 'dpworksiteservices-loanperson-gt',
  templateUrl: './loanperson-gt.component.html',
  styleUrls: ['./loanperson-gt.component.scss']
})
export class LoanpersonGtComponent extends WorkflowBaseComponent implements OnInit {
  @ViewChild('loanperson') loanperson:LoanpersonbaseComponent

  proctask:any;
  EnterPriseCode:any;
  model:any = {}
  submitting: any = false;
  usertype:any = 20;

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
    this.proctask = this.task
  }

  

  saveClick() {
    //保存内容
    this.loanperson.saveClick()
  }

}
