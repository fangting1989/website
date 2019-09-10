import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { dataServices } from '../../../services';
import { Enums } from './../../../../../shared/utils/enums';
import { comservices } from '../../../../../shared/services';
import { Router, ActivationEnd, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'paimai-tmember-edit',
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
  constructor(private msg: NzMessageService,
    private dataServices: dataServices,
    private comservices: comservices,
    private route:ActivatedRoute,
    private router:Router
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
    this.dataServices.tmemberList(this.model).subscribe(result => {
      if (result != null && result.data.length > 0) {
         self.model = result.data[0];
       }
     })
  }


  /*loadData(){
    var self = this;
    this.model = {}
    this.model.keycode = this.route.snapshot.queryParams["keycode"];
    this.dataServices.tmemberList(this.model).subscribe(result => {
      if (result != null && result.data.length > 0) {
         self.model = result.data[0];
       }
     })
  }*/

  saveClick() {
    if(this.submitting){
        return
    }
    this.submitting = true;
    var self = this;
    this.model.enterpriseid = this.EnterPriseCode
    if (this.model.keycode) {
      this.dataServices.tmemberUp(this.model).subscribe(result => {
        this.submitting = false
        if (result != null) {
          self.model = result.data;
          self.msg.success("操作成功!");
        }
      })
    } else {
      this.dataServices.tmemberIn(this.model).subscribe(result => {
        this.submitting = false
        if (result != null) {
          self.model = result.data;
          self.msg.success("操作成功!");
        }
      })
    }
  }

  goMemberPage(){
    this.router.navigate(['/dppaimai/tmemberlist']);
  }

}
