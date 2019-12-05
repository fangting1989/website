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
import {BaseEmergentpersonComponent} from './../../../basecomponents/base-emergentperson/base-emergentperson.component';
@Component({
  selector: 'dpworksiteservices-loancard-emergentperson',
  templateUrl: './loancard-emergentperson.component.html',
  styles: []
})
export class LoancardEmergentpersonComponent extends WorkflowBaseComponent implements OnInit {
  @ViewChild('emergentperson') emergentperson:BaseEmergentpersonComponent  
  proctask:any;
  EnterPriseCode:any;
  model:any = {}
  submitting: any = false;
  objecttype:any = 20
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
    this.emergentperson.saveClick()
  }

}



