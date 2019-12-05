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
  selector: 'dpworksiteservices-liftingcar-material',
  templateUrl: './liftingcar-material.component.html',
  styles: []
})
export class LiftingcarMaterialComponent extends WorkflowBaseComponent implements OnInit {
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
        {name:'车辆合格证',indexnum:1,type:'tccl-clhgz'},
        {name:'车全貌照片',indexnum:2,type:'tccl-cqmzp'},
        {name:'关单',indexnum:3,type:'tccl-gd'},
        {name:'检验单',indexnum:4,type:'tccl-jyd'},
        {name:'购车发票',indexnum:5,type:'tccl-gcfp'},
        {name:'车辆商业险',indexnum:6,type:'tccl-clsyx'},
        {name:'车辆交强险',indexnum:7,type:'tccl-cljqx'},
        {name:'批单（第一次变更）',indexnum:8,type:'tccl-pddycbg'},
        {name:'批单（第二次变更）',indexnum:9,type:'tccl-pddecbg'},
        {name:'车架号照片',indexnum:10,type:'tccl-cjhzp'},
        {name:'农户与车辆的正面合影',indexnum:11,type:'tccl-nhycldzmhy'},
        {name:'身份证（正反面）与车架号合影',indexnum:12,type:'tccl-sfzycjhhy'},
        {name:'机动车登记证书（权证）复印件',indexnum:13,type:'tccl-jdcdjzsfyj'},
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
