import { Component, OnInit,ChangeDetectionStrategy,TemplateRef, ViewChild,ChangeDetectorRef,ElementRef } from '@angular/core';
import {GlobalState} from './../../../../../core/common';
import { prodServices } from '../../../services';
import { _ } from 'underscore';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer,SafeUrl} from "@angular/platform-browser";

import {
  NzDropdownService,
  NzMessageService,
  NzModalService,
  NzTreeSelectComponent
} from 'ng-zorro-antd';
import { ModalHelper } from '@delon/theme';
import { Enums } from './../../../../../shared/utils/enums';
import { comservices} from '../../../../../shared/services';

@Component({
  selector: 'app-typelist',
  templateUrl: './typelist.component.html',
  styleUrls: ['./typelist.component.scss']
})
export class TypelistComponent implements OnInit {

  changeHeight: number;
  TreeData:any= [];
  typeItemBox: number = 1;
  okType: string;
  abc:NzTreeSelectComponent
  SelTypeTreeData:any;
  submitting:any = false;
  SelTreeData:any;
  expandKeys:any = []
  model:any = {}
  EnterPriseCode:any;
  stateArray:any = Object.assign([],Enums.stateArray);
  
  FileObject: any;
  ShowUpload:any = true;
  ImageSrc:any = '#';
  imgUrl: SafeUrl;
  dd:any = "5"
  @ViewChild('file')
  file: ElementRef;

  constructor(
    private _state: GlobalState,
    private nzDropdownService: NzDropdownService,
    private dataServices: prodServices,
    private fb: FormBuilder, 
    private msg: NzMessageService,
    private cdr: ChangeDetectorRef,
    private modalService:NzModalService,
    private modalHelper:ModalHelper,
    private comservices:comservices,
    private sanitizer:DomSanitizer
  ) {
    this._state.notifyDataChanged('app.nav', { level: 1, NavName: "类别管理", routerLink: "./sysmanager/enumeration" });
    this.changeHeight = window.innerHeight - 110;

    this.EnterPriseCode = comservices.getEnterPrise
  }
  
  ngOnInit() {
    var self = this;
    window.onresize = function () {
      self.changeHeight = window.innerHeight - 110;
    }
    //下拉框默认值
    this.LoadTreeData();
  }

  LoadTreeData(){
    this.model = {}
    this.ImageSrc = "#"
    this.SelTreeData = []
    this.ShowUpload = true
    //初始化选择
    this.SelTypeTreeData = [{key:"-1",title:"默认类别",isLeaf:true}]
    //加载默认数据
    this.loadChildTreeData(-1,null,null)
  }

  TreeChild(e,type){
    if(e.eventName == 'expand'){
      if(e.node.origin.type == "node"){
        e.node.isLoading = false
        return
      }
      //清空当前节点子节点
      this.loadChildTreeData(e.node.key,e,type)
    }
  }

  loadChildTreeData(pId,event,type){
    if(event){
      event.node.clearChildren();
    }
    var self = this;
    var postData = {
      keycode:pId,
      enterpriseid: self.EnterPriseCode
    }
    this.dataServices.objecttype_findbyparent(postData).subscribe(result => {
      if(result){
        var mmmdata:any = [];
        _.each(result.data,item =>{
          item.key =  item.objectTypeID
          item.title = item.typeName
          item.type = "nodetype"
          mmmdata.push(item)
        })
        if(!event){
          //初始化数据
          self.TreeData = mmmdata;
          self.SelTreeData = mmmdata;
          var obdata = Object.assign([],self.SelTypeTreeData)
          _.each(mmmdata,item=>{
            obdata.push(item);
          })
          self.SelTypeTreeData = obdata
        }else{
          if(type == 'select'){
            _.each(mmmdata,item=>{
              item.disabled = event.node.origin.disabled
            })
          }
          event.node.addChildren(mmmdata)
        }
      }
    })
  }

  addClick(){
    this.model = {
      pid: "-1"
    }
    this.ImageSrc = "#"
    this.ShowUpload = true;
  }

  TreeItemClick(event){
    var self = this;
    //选中
    if(event.node){
      if(event.node.origin.type == "nodetype"){
        this.typeItemBox = 1;
      }else{
        this.typeItemBox = 2;
      }
      this.model = event.node.origin
      
      this.resetTreeData(this.SelTypeTreeData,this.model.objectTypeID,false)

      self.SelTypeTreeData = Object.assign([],self.SelTypeTreeData)

      this.ImageSrc = "#"
      this.ShowUpload = true
      if(this.model.typeIcon && this.model.typeIcon != ''){
        this.ShowUpload = false;
        this.ImageSrc = WebConfig.BaseUrl + WebConfig.RequestUrl.fileuploadpath+ this.model.typeIcon;
        this.file.nativeElement.value = null;
      }
    }
  }
  okClick(){
    if(!this.model.pid){
      this.msg.error("请选择上级类别");
      return
    }
    if(!this.model.typeName){
      this.msg.error("请输入名称");
      return
    }
    if(this.submitting){
      return
    }
    this.submitting = true
    var self = this;
      this.model.enterpriseid = this.EnterPriseCode
      //类别保存
      if(this.model.keycode){
        this.dataServices.objecttypeUp(this.model).subscribe(result => {
          this.submitting = false
          if(result){
            this.uploadImg(result.data.keycode)
          }
        })
      }else{
        this.dataServices.objecttypeIn(this.model).subscribe(result => {
          this.submitting = false
          if(result){
            this.uploadImg(result.data.keycode)
          }
        })
      }
  }

  deleteClick(){
    this.model
    var self = this;
    if(this.typeItemBox == 1){
      //类别删除
      var self = this;
      this.modalService.confirm({
        nzTitle     : '提示',
        nzContent   : '<b style="color: red;">是否确认删除对象</b>',
        nzOkText    : '确定',
        nzOkType    : 'danger',
        nzOnOk      : () => {
          var postData = {
            keycode:self.model.keycode
          }
          self.dataServices.objecttypeDel(postData).subscribe(result => {
            if (result != null) {
              self.msg.success("删除成功!");
              self.LoadTreeData();
            }
          })
        },
        nzCancelText: '取消',
        nzOnCancel  : () => {
        
        }
      });
    }
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
    formData.append("tablename", "action");
    formData.append("filepath","action")
    //上传图片
    if (this.FileObject) {
      this.dataServices.uploadImgonly(formData).subscribe(result => {
        if(result){
          var postData = {
            keycode:keycode,
            typeIcon:result,
            enterpriseid:self.EnterPriseCode
          }
          this.dataServices.objecttypeUp(postData).subscribe(result => {
            if(result){
              this.ImageSrc = WebConfig.BaseUrl + WebConfig.RequestUrl.fileuploadpath+ postData.typeIcon;
              this.model.typeIcon = postData.typeIcon

              self.LoadTreeData();
            }
          })
          self.msg.success("操作成功!")
        }
      })
    } else{
      this.LoadTreeData();
      self.msg.success("操作成功!")
    }
  }

  resetTreeData(treeData,disableCode,parentState){
    var self =this;
    //重置数据
    _.each(treeData,it=>{
      if(it.objectTypeID ==disableCode){
        it.disabled = true
      }else{
        it.disabled = parentState;
      }
      self.resetTreeData(it.children,disableCode, it.disabled)
    })

    _.each()
  }

  onChange_Start(e){
    console.log('onChange: ', e);
  }

  onChange_End(e){
    console.log('onChange: ', e);
  }
}
