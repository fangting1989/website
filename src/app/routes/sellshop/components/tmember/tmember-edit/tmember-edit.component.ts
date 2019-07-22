import { Component, OnInit } from '@angular/core';
import {
  NzMessageService,
  NzModalService
} from 'ng-zorro-antd';
import { ModalHelper } from '@delon/theme';
import { dataServices } from '../../../services';
import { Enums } from './../../../../../shared/utils/enums';
import { comservices } from '../../../../../shared/services';
import { Router, ActivationEnd, ActivatedRoute } from '@angular/router';
import {TmemberAddpointsComponent} from './../tmember-addpoints/tmember-addpoints.component';
@Component({
  selector: 'app-tmember-edit',
  templateUrl: './tmember-edit.component.html',
  styleUrls: ['./tmember-edit.component.scss']
})
export class TMemberEditComponent implements OnInit {
  data: any;
  model: any = {}
  EnterPriseCode: any;
  submitting:any = false;
  stateArray: any = Object.assign([], Enums.stateArray);
  paytypeArray: any = Object.assign([], Enums.paytypeArray);
  AddressList:any = []

  OrderList:any = []
  PageNum:any = 1;
  PageSize:any = 10;
  TotalCount:any = 0;
  constructor(private msg: NzMessageService,
    private dataServices: dataServices,
    private comservices: comservices,
    private route:ActivatedRoute,
    private router:Router,
    private modalService:NzModalService,
    private modalHelper:ModalHelper,
  ) {
    this.EnterPriseCode = comservices.getEnterPrise
  }

  ngOnInit() {
    this.loadData();
    this.loadAddress();
    this.loadOrder();
  }

  loadData(){
    var self = this;
    this.model = {}
    this.model.keycode = this.route.snapshot.queryParams["keycode"];
    this.model.enterpriseid = this.comservices.getEnterPrise;
    this.dataServices.tmemberList(this.model).subscribe(result => {
      if (result != null && result.data.length > 0) {
         self.model = result.data[0];
       }
     })
  }

  loadAddress(){
    var postData = {
      enterpriseid:this.comservices.getEnterPrise,
      memberid:this.route.snapshot.queryParams["keycode"]
    }
    this.dataServices.taddressList(postData).subscribe(result => {
      if(result){
        console.log(result)
        this.AddressList = result.data;
      }
    })
  }

  loadOrder(){
    var postData = {
      enterpriseid:this.comservices.getEnterPrise,
      memberid:this.route.snapshot.queryParams["keycode"]
    }
    this.dataServices.torderList(postData).subscribe(result => {
      if(result){
        this.OrderList = result.data;
      }
    })
  }

  // saveClick() {
  //   if(this.submitting){
  //       return
  //   }
  //   this.submitting = true;
  //   var self = this;
  //   this.model.enterpriseid = this.EnterPriseCode
  //   if (this.model.keycode) {
  //     this.dataServices.tmemberUp(this.model).subscribe(result => {
  //       this.submitting = false
  //       if (result != null) {
  //         self.model = result.data;
  //         self.msg.success("操作成功!");
  //       }
  //     })
  //   } else {
  //     this.dataServices.tmemberIn(this.model).subscribe(result => {
  //       this.submitting = false
  //       if (result != null) {
  //         self.model = result.data;
  //         self.msg.success("操作成功!");
  //       }
  //     })
  //   }
  // }

  goOrderDetail(item){
    this.router.navigate(['/sellshop/torderedit'],{ queryParams: { keycode: item.keycode } });
  }

  goMemberPage(){
    this.router.navigate(['/sellshop/tmemberlist']);
  }

  PointDetail(){
    var data = {HeadText:'会员积分',itemdata:this.model }
    const modal = this.modalHelper.create(TmemberAddpointsComponent,{ data: data},{size:800}).subscribe(res => {
      this.loadData()
    });
  }

}
