import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { ModalHelper } from '@delon/theme';
import { GlobalState } from '../../../../../core/common';
import { dataServices } from '../../../services';
import { _ } from 'underscore';
import { forkJoin, of, interval } from 'rxjs';
import { comservices, dataServices as baseservice } from '../../../../../shared/services';
import { WorkflowBaseComponent } from './../../../../../shared/components';
import {MaterialSaveComponent} from '../../../basecomponents/material-save/material-save.component';
@Component({
  selector: 'dpworksiteservices-accesscar',
  templateUrl: './accesscar.component.html',
  styleUrls: ['./accesscar.component.scss']
})
export class AccesscarComponent extends WorkflowBaseComponent implements OnInit {
  @ViewChild('materialcomponent') materialcomponent:MaterialSaveComponent

  model: any = {}
  EnterPriseCode: any;
  submitting: any = false;
  proctask: any;
  materialname: any = 'pgbg_material'

  constructor(
    public msg: NzMessageService,
    private modalHelper: ModalHelper,
    private modalService: NzModalService,
    private dataServices: dataServices,
    private comservices: comservices,
    public elementRef: ElementRef,
  ) {
    super(elementRef);
    this.EnterPriseCode = comservices.getEnterPrise
  }

  ngOnInit() {
    this.proctask = this.task
    this.loadData();
  }

  loadData() {
    var self = this;
    var postData = {
      enterpriseid: this.EnterPriseCode,
      procinstid: this.task.processinstanceid
    }
    this.dataServices.tcaraccessList(postData).subscribe(result => {
      if (result != null && result.data.length > 0) {
        self.model = result.data[0];
      }
    })
  }

  saveClick() {
    //保存内容
    if (this.submitting) {
      return
    }
    this.submitting = true;
    var self = this;
    this.model.enterpriseid = this.EnterPriseCode
    this.model.procinstid = this.task.processinstanceid
    if (this.model.keycode) {
      this.dataServices.tcaraccessUp(this.model).subscribe(result => {
        this.submitting = false
        if (result != null) {
          self.model = result.data;
          self.msg.success("操作成功!");
        }
      })
    } else {
      this.dataServices.tcaraccessIn(this.model).subscribe(result => {
        this.submitting = false
        if (result != null) {
          self.model = result.data;
          self.msg.success("操作成功!");
        }
      })
    }
    this.SecondHandMaterial();
  }

  SecondHandMaterial() {
    this.materialcomponent.saveClick()
  }
}
