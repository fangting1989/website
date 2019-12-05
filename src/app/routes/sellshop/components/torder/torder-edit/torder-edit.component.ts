import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { dataServices } from '../../../services';
import { Enums } from './../../../../../shared/utils/enums';
import { comservices } from '../../../../../shared/services';
import { Router, ActivationEnd, ActivatedRoute } from '@angular/router';
import { ModalHelper } from '@delon/theme';
import {TOrderdetailEditComponent} from '../torderdetail-edit/torderdetail-edit.component';
import {_} from 'underscore';
@Component({
  selector: 'app-torder-edit',
  templateUrl: './torder-edit.component.html',
  styleUrls: ['./torder-edit.component.scss']
})
export class TOrderEditComponent implements OnInit {
  data: any= {};
  model: any = {}
  EnterPriseCode: any;
  submitting:any = false;
  stateArray: any = Object.assign([], Enums.stateArray);
  paytypeArray: any = Object.assign([], Enums.paytypeArray);
  constructor(private msg: NzMessageService,
    private dataServices: dataServices,
    private comservices: comservices,
    private route:ActivatedRoute,
    private modalHelper:ModalHelper,
    private router:Router,
  ) {
    this.EnterPriseCode = comservices.getEnterPrise
  }

  ngOnInit() {
    this.loadData();
  }

  loadData(){
    var self = this;
    this.model = {}
    this.model.keycode = this.route.snapshot.queryParams["keycode"];
    this.model.enterpriseid = this.comservices.getEnterPrise;
    this.dataServices.torderList(this.model).subscribe(result => {
      if (result != null && result.data.length > 0) {
         self.model = result.data[0];
         _.each(self.model.list,it=>{
          self.loadProductunit(it)
         })
       }
     })
  }

  loadProductunit(item){
    var postData = {
      productid:item.productid,
      unitcode:item.unitid,
      enterpriseid:this.comservices.getEnterPrise,
    }
    this.dataServices.tproductunitList(postData).subscribe(result=>{
      if(result && result.data.length > 0){
        item.productbusinessno = result.data[0].productbusinessno
        item.productunitno = result.data[0].productunitno
      }
    })
  }

  saveClick() {
    if(this.submitting){
        return
    }
    this.submitting = true;
    var self = this;
    this.model.enterpriseid = this.EnterPriseCode
    if (this.model.keycode) {
      this.dataServices.torderUp(this.model).subscribe(result => {
        this.submitting = false
        if (result != null) {
          self.model = result.data;
          self.msg.success("操作成功!");
          self.closeModal();
        }
      })
    } else {
      this.dataServices.torderIn(this.model).subscribe(result => {
        this.submitting = false
        if (result != null) {
          self.model = result.data;
          self.msg.success("操作成功!");
          self.closeModal();
        }
      })
    }
  }

  cancelClick() {
    this.closeModal();
  }

  closeModal() {
    
  }

  fixPrice(item){
    var self = this;
    var data = {HeadText:'订单详情',itemdata:item}
    const modal = this.modalHelper.create(TOrderdetailEditComponent,{ data: data},{size:800}).subscribe(res => {
      if(res && res.keycode){
        self.loadData();
      }
    });
  }

  goOrderPage(){
    this.router.navigate(['/sellshop/torderlist']);
  }
}
