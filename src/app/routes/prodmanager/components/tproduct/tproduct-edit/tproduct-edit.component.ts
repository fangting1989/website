import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { NzMessageService,NzModalService } from 'ng-zorro-antd';
import { prodServices } from '../../../services';
import { Enums } from './../../../../../shared/utils/enums';
import { comservices } from '../../../../../shared/services';
import { DomSanitizer,SafeUrl} from "@angular/platform-browser";
import {_} from 'underscore';
import { TproductunitComponent} from '../tproductunit/tproductunit.component'
import { ModalHelper } from '@delon/theme';

import { Router, ActivationEnd, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-tproduct-edit',
  templateUrl: './tproduct-edit.component.html',
  styleUrls: ['./tproduct-edit.component.scss']
})
export class TProductEditComponent implements OnInit {
  data: any;
  model: any = {}
  EnterPriseCode: any;
  stateArray: any = Object.assign([], Enums.stateArray);
  paytypeArray: any = Object.assign([], Enums.paytypeArray);
  sendfeeArray:any  = [{name:'包邮',value:0},{name:'不包邮',value:1}];
  turnbackdayArray:any  = [{name:'不支持',value:0},{name:'7天无理由退货',value:1}]
  FileObject: any;
  ShowUpload:any = true;
  ImageSrc:any = '#';
  imgUrl: SafeUrl;
  @ViewChild('file')
  file: ElementRef;

  SelTypeTreeData:any;
  expandKeys:any = []
  UnitDataList:any =[];
  BrandList:any = [];
   constructor(private msg: NzMessageService,
    private dataServices: prodServices,
    private comservices: comservices,
    private sanitizer:DomSanitizer,
    private modalHelper:ModalHelper,
    private modalService:NzModalService,
    private route:ActivatedRoute,
    
  ) {
    this.EnterPriseCode = comservices.getEnterPrise
  }

  ngOnInit() {
    this.loadData(); 
    this.loadBrand();
  }

  loadData(){
    var self = this;
    this.model = {}
    this.model.keycode = this.route.snapshot.queryParams["keycode"];
    this.model.enterpriseid = this.comservices.getEnterPrise
    if(this.model.keycode){
      this.dataServices.tproductList(this.model).subscribe(result => {
        if (result != null && result.data.length > 0) {
          self.model = result.data[0];
          if(!self.model.sendfee){
            self.model.sendfee_sel = 0
          }else{
            self.model.sendfee_sel = 1
          }
          if(this.model.productimage && this.model.productimage != ''){
            this.ShowUpload = false;
            this.ImageSrc = WebConfig.BaseUrl + WebConfig.RequestUrl.fileuploadpath+ this.model.productimage;
            this.file.nativeElement.value = null;
          }
          this.UnitDataList = this.model.listproductunit
          //this.model.producttype = "0"
        }
        this.loadTreeData();
      })
    }else{
      this.loadTreeData();
    }
    
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

  SendFeeChanged(e){
    if(e == 0){
      this.model.sendfee = 0
    }
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
        if(self.model){
          self.model.producttype = self.model.producttype + ""
        }
        
      }
    })
  }

  saveClick() {
    var self = this;
    this.model.enterpriseid = this.EnterPriseCode
    if (this.model.keycode) {
      this.dataServices.tproductUp(this.model).subscribe(result => {
        if (result != null) {
          self.model = result.data;
          self.uploadImg(self.model.keycode);
        }
      })
    } else {
      this.dataServices.tproductIn(this.model).subscribe(result => {
        if (result != null) {
          self.model = result.data;
          self.uploadImg(self.model.keycode);
        }
      })
    }
  }

  cancelClick() {
    this.closeModal();
  }

  closeModal() {
  }

  //---图片---
  getUpload(e) {
    let path = e.target.value,
      extStart = path.lastIndexOf('.'),
      ext = path.substring(extStart, path.length).toUpperCase();
    if (ext !== '.PNG' && ext !== '.JPG' && ext !== '.JPEG' && ext !== '.GIF') {
      this.msg.error("请上传正确的图片格式")
      return;
    }
    if (e.target.files[0]) {
      this.FileObject = e.target.files[0];
      this.ImageSrc = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(e.target.files[0]));
      this.ShowUpload = false;
    }
  }
  upimg() {
    this.file.nativeElement.click();
  }
  closeImg() {
   this.ShowUpload = true;
   this.file.nativeElement.value = null;
  }

  uploadImg(keycode) {
    var self = this;
    let formData = new FormData();
    formData.append("file", this.FileObject);
    formData.append("keycode", keycode);
    formData.append("tablename", "prod");
    formData.append("filepath","prod")
    //上传图片
    if (this.FileObject) {
      this.dataServices.uploadImgonly(formData).subscribe(result => {
        if(result){
          var postData = {
            keycode:keycode,
            productimage:result,
            enterpriseid:self.EnterPriseCode
          }
          this.dataServices.tproductUp(postData).subscribe(result => {
            if(result){

            }
          })
          self.msg.success("操作成功!")
          self.closeModal();
        }
      })
    } else{
      self.msg.success("操作成功!")
      self.closeModal();
    }
  }

  GetTreeData(pid,CurrArray,AllArray){
    _.each(AllArray,item=>{
      if(item.parent_id == pid){
        CurrArray.push(item)
        item.children = []
        this.GetTreeData(item.id,item.children,AllArray)
      }
    })
  }

  addProdUnit(){
    var self = this;
    var item = {
      productid:this.model.keycode
    }
    //增加规格
    var data = {HeadText:'编辑规格',itemdata:item}
    const modal = this.modalHelper.create(TproductunitComponent,{ data: data},{size:800}).subscribe(res => {
      console.log(res)
      if(res.keycode){

        self.UnitDataList.push(res)
        self.UnitDataList = Object.assign([],self.UnitDataList)
        console.log("==================")
        console.log(self.UnitDataList)
      }
    });
    
  }

  deleteUnitItem(item){
    var self = this;
    this.modalService.confirm({
      nzTitle     : '提示',
      nzContent   : '<b style="color: red;">是否确认删除对象</b>',
      nzOkText    : '确定',
      nzOkType    : 'danger',
      nzOnOk      : () => {
        var postData = {
          keycode:item.keycode
        }
        self.dataServices.tproductunitDel(postData).subscribe(result => {
          if (result != null) {
            self.msg.success("删除成功!");
            //删除对象
            var index = _.indexOf(self.UnitDataList, item)
            if (index > -1) {
              self.UnitDataList.splice(index, 1);
              self.UnitDataList = self.UnitDataList.slice();
            }
          }
        })
      },
      nzCancelText: '取消',
      nzOnCancel  : () => {

      }
    });
  }
}
