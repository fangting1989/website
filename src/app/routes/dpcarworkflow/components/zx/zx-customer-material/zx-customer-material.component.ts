import { Component, OnInit,ElementRef } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { dataServices } from '../../../services';
import { Enums } from './../../../../../shared/utils/enums';
import { comservices } from '../../../../../shared/services';
import { Router, ActivationEnd, ActivatedRoute } from '@angular/router';
import {WorkflowBaseComponent} from './../../../../../shared/components';

@Component({
  selector: 'dpworksiteservices-zx-customer-material',
  templateUrl: './zx-customer-material.component.html',
  styleUrls: ['./zx-customer-material.component.scss']
})
export class ZxCustomerMaterialComponent extends WorkflowBaseComponent implements OnInit{

  model:any = {}
  EnterPriseCode: any;

  constructor(
    private msg: NzMessageService,
    private dataServices: dataServices,
    private comservices: comservices,
    private route:ActivatedRoute,
    public elementRef:ElementRef,
  ) { 
    super(elementRef);
    this.EnterPriseCode = comservices.getEnterPrise
  }

  ngOnInit() {
    this.loadData();
  }

  loadData(){

  }

  SaveComponent(){
    console.log("zheshiwojdadkashdkasd");
  }

  CheckComponentState(){
    return {code:99,msg:'检测通过..'}
 }

}
