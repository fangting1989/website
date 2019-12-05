import { Component, OnInit } from '@angular/core';
import {GlobalState} from './../../../../../core/common';
import { dataServices } from '../../../services';
import { _ } from 'underscore';
import {
  NzMessageService,
  NzModalService
} from 'ng-zorro-antd';
import { ModalHelper } from '@delon/theme';
import { comservices} from '../../../../../shared/services';
import {Router} from '@angular/router';

@Component({
  selector: 'dpcar-customer-msg',
  templateUrl: './customer-msg.component.html',
  styleUrls: ['./customer-msg.component.scss']
})
export class CustomerMsgComponent implements OnInit {

  model:any = {}
  tipmsg:any = "由XXX部门发起停款处理，停款原因：保证金不足（合同未收到，）如有异议，请联系停款部门处理解决。";

  item:any = {}
  constructor(
    public msg: NzMessageService,
    private modalService:NzModalService,
    private modalHelper:ModalHelper,
    private dataServices:dataServices,
    private comservices:comservices,
    private _state:GlobalState,
    private router:Router,
  ) { }

  ngOnInit() {
  }

  ItemDetail(item){
    
  }

}
