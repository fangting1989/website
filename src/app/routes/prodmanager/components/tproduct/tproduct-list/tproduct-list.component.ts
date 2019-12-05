import { Component, OnInit } from '@angular/core';
import {GlobalState} from './../../../../../core/common';
import { prodServices } from '../../../services';
import { _ } from 'underscore';
import {Router} from '@angular/router';
import {
  NzMessageService,
  NzModalService
} from 'ng-zorro-antd';
import { ModalHelper } from '@delon/theme';
import { comservices} from '../../../../../shared/services';
import { TProductEditComponent} from '../tproduct-edit/tproduct-edit.component'
import { TproductImagesComponent} from '../tproduct-images/tproduct-images.component'
import { TproductContentComponent} from '../tproduct-content/tproduct-content.component'
import { Enums } from './../../../../../shared/utils/enums';

@Component({
  selector: 'app-tproduct-list',
  templateUrl: './tproduct-list.component.html',
  styleUrls: ['./tproduct-list.component.scss']
})
export class TProductListComponent implements OnInit {
  DataList:any = []
  searchObject:any = {};
  PageNum:any = 1;
  PageSize:any = 10;
  TotalCount:any = 0;
  expandForm:any = true;
  loading = false;
  EnterPriseCode:any;
  StateArray: any =[{name:'全部',value:null}].concat(Enums.prostateArray);

  SelTypeTreeData:any = [];
  
  BrandList:any;
  
  constructor(
    public msg: NzMessageService,
    private modalService:NzModalService,
    private modalHelper:ModalHelper,
    private dataServices:prodServices,
    private comservices:comservices,
    private _state:GlobalState,
    private router:Router
  ) {
    this.EnterPriseCode = comservices.getEnterPrise
  }

  ngOnInit() {
    this.loadData();
    this.loadTreeData();
    this.loadBrand();
  }

  loadData(){
    var self = this;
    var postData:any = {
      pagesize:this.PageSize,
      pagenum:this.PageNum,
      searchtext:this.searchObject.searchText,
      enterpriseid: this.EnterPriseCode
    }
    if(this.searchObject.productvalid || this.searchObject.productvalid===0){
      postData.productvalid = this.searchObject.productvalid
    }
    if(this.searchObject.producttype ){
      postData.producttype = this.searchObject.producttype
    }
    if(this.searchObject.productbrand ){
      postData.productbrand = this.searchObject.productbrand
    }
    this.dataServices.tproductList(postData).subscribe(result => {
      if (result != null) {
        self.DataList = result.data;
        self.TotalCount =result.recordcount
      }
    })
  }

  loadTreeData(){
    var self = this;
    var postData = {
      enterpriseid:this.EnterPriseCode
    }
    this.dataServices.getprodtypetree(postData).subscribe(result => {
      if(result){
        var treeDataArray  = [];
        _.each(result.data,item =>{
          item.key = item.objectTypeID
          item.parent_id = item.pid
          item.title = item.typeName,
          treeDataArray.push(item)
        })
        var treeData  = [];
        self.GetTreeData(-1,treeData,treeDataArray);
        self.SelTypeTreeData = treeData;
        
      }
    })
  }

  GetTreeData(pid,CurrArray,AllArray){
    _.each(AllArray,item=>{
      if(item.parent_id == pid){
        CurrArray.push(item)
        item.children = []
        this.GetTreeData(item.key,item.children,AllArray)
      }
    })
  }

  loadBrand(){
    var self = this;
    var postData = {
      enterpriseid:this.EnterPriseCode,
      pagesize:1000,
      pagenum:1 
    }
    this.dataServices.tproductbrandList(postData).subscribe(result => {
      if(result){
        this.BrandList = result.data;
      }
    })
  }

  SearchClick(e){
    this.PageNum = 1;
    this.loadData();
  }

  changeState(e,item){
    _.each(this.StateArray,it=>{
      it.active = false;
    })
    item.active = true;
    this.searchObject.productvalid = item.value
    this.loadData();
  }

  addClick(record: any = {}){
    var data = {HeadText:'添加商品'}
    this.router.navigate(['/prodmanager/tproductedit']);
  }

  editItem(item){
    var data = {HeadText:'编辑',itemdata:item}
    this.router.navigate(['/prodmanager/tproductedit'],{ queryParams: { keycode: item.keycode } });
    // const modal = this.modalHelper.create(TProductEditComponent,{ data: data},{size:800}).subscribe(res => {
    //   this.loadData()
    // });
  }

  deleteItem(item){
    var self = this;
    this.modalService.confirm({
      nzTitle     : '提示',
      nzContent   : '<b style="color: red;">是否确认删除对象</b>',
      nzOkText    : '确定',
      nzOkType    : 'danger',
      nzOnOk      : () => {
        var postData = {
          keycode:item.keycode,
          operateperson:self.comservices.getUserName,
          enterpriseid:self.comservices.getEnterPrise
        }
        self.dataServices.tproductDel(postData).subscribe(result => {
          if (result != null) {
            self.msg.success("删除成功!");
            self.loadData()
          }
        })
      },
      nzCancelText: '取消',
      nzOnCancel  : () => {

      }
    });
  }

  picItem(item){
    var data = {HeadText:'编辑图片',itemdata:item}
    const modal = this.modalHelper.create(TproductImagesComponent,{ data: data},{size:800}).subscribe(res => {
      this.loadData()
    });
  }
  contentItem(item){
    var data = {HeadText:'编辑内容',itemdata:item}
    const modal = this.modalHelper.create(TproductContentComponent,{ data: data},{size:800}).subscribe(res => {
      this.loadData()
    });
  }

  ChangeState(item,state){

    var self = this;
    this.modalService.confirm({
      nzTitle     : '提示',
      nzContent   : '<b style="color: red;">是否确认'+(state == 1?'上架':'下架')+'</b>',
      nzOkText    : '确定',
      nzOkType    : 'danger',
      nzOnOk      : () => {
        var postData = {
          productvalid:state,
          keycode:item.keycode,
          enterpriseid:self.comservices.getEnterPrise,
          operateperson:self.comservices.getUserName,
        }
        self.dataServices.tproductUp(postData).subscribe(result => {
          if(result){
            item.productvalid = state
          }
        })
      }
    })
  }

  //checkbox
  isIndeterminate:any = false;
  isAllDisplayDataChecked:any = false;
  checkAll(event){
    _.each(this.DataList,it=>{
      it.checked = event;
    })
  }

  UpProduct(){
    var self = this;
    this.modalService.confirm({
      nzTitle     : '提示',
      nzContent   : '<b style="color: red;">是否确认上架选中的商品',
      nzOkText    : '确定',
      nzOkType    : 'danger',
      nzOnOk      : () => {
        _.each(self.DataList,it=>{
          if(!it.checked){
            return
          }
          if(it.productvalid == 0){
            var postData = {
              productvalid:1,
              keycode:it.keycode,
              enterpriseid:self.comservices.getEnterPrise,
              operateperson:self.comservices.getUserName,
            }
            self.dataServices.tproductUp(postData).subscribe(result => {
              if(result){
                it.productvalid = 1
              }
            })
          }
        })
        self.msg.success("操作成功!")
      }
    })
  }

  DownProduct(){
    var self = this;
    this.modalService.confirm({
      nzTitle     : '提示',
      nzContent   : '<b style="color: red;">是否确认下架选中的商品',
      nzOkText    : '确定',
      nzOkType    : 'danger',
      nzOnOk      : () => {
        _.each(self.DataList,it=>{
          if(!it.checked){
            return
          }
          if(it.productvalid == 1){
            var postData = {
              productvalid:0,
              keycode:it.keycode,
              enterpriseid:self.comservices.getEnterPrise,
              operateperson:self.comservices.getUserName,
            }
            self.dataServices.tproductUp(postData).subscribe(result => {
              if(result){
                it.productvalid = 0
              }
            })
          }
        })
        self.msg.success("操作成功!")
      }
    })
  }
}
