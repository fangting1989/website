import { Component, OnInit } from '@angular/core';
import {GlobalState} from './../../../../../../core/common';
import { dataServices } from '../../../../services';
import {Router} from '@angular/router';
import { _ } from 'underscore';
import {
  NzMessageService,
  NzModalService
} from 'ng-zorro-antd';
import { ModalHelper } from '@delon/theme';
import { comservices} from '../../../../../../shared/services';
@Component({
  selector: 'app-cartaskcreate',
  templateUrl: './cartaskcreate.component.html',
  styleUrls: ['./cartaskcreate.component.scss']
})
export class CartaskcreateComponent implements OnInit {
  DataList:any = []
  searchObject:any = {
    state:1
  };
  model:any = {}
  PageNum:any = 1;
  PageSize:any = 10;
  TotalCount:any = 0;
  expandForm:any = false;
  loading = false;
  EnterPriseCode:any;
  imageList:any = [
    {name:"身份证正面",value:1},
    {name:'身份证反面',value:2},
    {name:'征信授权书',value:3},
    {name:'大数据查询授权书',value:4},
    {name:'授权书签字照片',value:5}
  ]

  date_range:any = []
  constructor(
    public msg: NzMessageService,
    private modalService:NzModalService,
    private modalHelper:ModalHelper,
    private dataServices:dataServices,
    private comservices:comservices,
    private _state:GlobalState,
    private router:Router,
  ) {
    this.EnterPriseCode = comservices.getEnterPrise
  }

  ngOnInit() {
    //this.loadData();
  }

  loadData(){
    var self = this;
    var postData:any = {
      pagesize:this.PageSize,
      pagenum:this.PageNum,
      enterpriseid: this.EnterPriseCode
    }
    if(this.searchObject.searchText){
      postData.filterText = this.searchObject.searchText
    }
    this.dataServices.enterprise_process(postData).subscribe(result => {
    // this.dataServices.process_find(postData).subscribe(result => {
      if (result != null) {
        self.DataList = result.data;
        self.TotalCount = result.recordcount;
      }
    })
  }

  SearchClick(e){
    this.loadData();
  }

  createUserTask(item){
    console.log(item)
    var self = this;
    var postData:any = {
      ProcessId: item.id
    }
    this.dataServices.process_create(postData).subscribe(result => {
      if (result != null) {
        console.log(result);
        this.msg.success("创建成功!")
        //返回
        this.router.navigate(['/workflow/tasklist']);
      }
    })
  }

  SubmitProcess(){

  }


  
}


