import { Component, OnInit,Input,ElementRef } from '@angular/core';
import { NzMessageService,NzModalService } from 'ng-zorro-antd';
import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { ModalHelper } from '@delon/theme';
import {GlobalState} from '../../../../core/common';
import { dataServices } from '../../services';
import {_} from 'underscore';
import { forkJoin, of, interval } from 'rxjs';
import { comservices,dataServices as baseservice } from '../../../../shared/services';

@Component({
  selector: 'dpworksiteservices-material-save',
  templateUrl: './material-save.component.html',
  styleUrls: ['./material-save.component.scss']
})
export class MaterialSaveComponent implements OnInit {

  @Input() ComponentMode:any = "edit"
  @Input() materialname:any = "proc_material"
  @Input() task:any = {}

  Images: any = [];
  renderObject: any = null;
  data: any;
  model: any = {}
  submitting:any = false;
  EnterPriseCode:any;
  IsshowImages:any = false;
  ShowImagePath:any = "#";

  constructor(
    public msg: NzMessageService,
    private modalHelper:ModalHelper,
    private modalService:NzModalService,
    private dataServices:dataServices,
    private comservices:comservices,
    public elementRef:ElementRef,
  ) { 
    this.EnterPriseCode = comservices.getEnterPrise
      this.renderObject = new FileReader();
  }

  ngOnInit() {
    this.loadData();
  }

  loadData(){
    var self = this;
    var postData = {
      pagesize:200,
      tablename: this.materialname,
      tableid:this.task.processinstanceid,
    }
    this.dataServices.tfileList(postData).subscribe(result => {
      if (result != null) {
        var has = false;
        _.each(result.data,function(dataitem){
          var has = false;
          _.each(self.Images,item=>{
            if(item.keycode){
              if(item.keycode == dataitem.keycode){
                has = true
              }
            }
          })
          if(!has){
           
            dataitem.filepath = WebConfig.BaseUrl + WebConfig.RequestUrl.dpworksiteservices+ dataitem.filepath;
            self.Images.push(dataitem)
          }
        })
      }
    })
  }

  public uploader: FileUploader = new FileUploader({
    itemAlias: "uploadedfile"
  });

  // 上传图片缩略图
  upload(event: any) {
    var self = this;
    if (this.uploader.queue.length > 0) {
      var ImgLength = this.uploader.queue.length
      var FileObject = this.uploader.queue[ImgLength - 1]
      this.renderObject.readAsDataURL(FileObject._file);
      this.renderObject.onloadend = (e) => {
        var imgObj = {
          content: "",
          fileItem: {}
        }
        imgObj.content = this.renderObject.result;
        imgObj.fileItem = FileObject;
        this.Images.push(imgObj);
        this.Images = this.Images.slice();
      }
    }
  }

  // 删除图片
  deleteImg(oobj,event) {
    event.preventDefault(); 
    //1.已经存在的   2.新增上传
    var self = this;
    this.modalService.confirm({
      nzTitle     : '提示',
      nzContent   : '<b style="color: red;">是否确认删除对象</b>',
      nzOkText    : '确定',
      nzOkType    : 'danger',
      nzOnOk      : () => {
        if (oobj.content != null) {
          var index = _.indexOf(self.Images, oobj)
          if (index > -1) {
            self.Images.splice(index, 1);
            self.Images = self.Images.slice();
          }
        }
        else {
          if (oobj.keycode == null) {
            return;
          }
          var postData = {
            keycode: oobj.keycode
          }
          self.dataServices.tfileDel(postData).subscribe(result => {
            if(result){
              this.msg.success("删除成功!");
              //删除对应的图片
              var index = _.indexOf(self.Images, oobj)
              if (index > -1) {
                self.Images.splice(index, 1);
                self.Images = self.Images.slice();
              }
            }
          })
        }
      }
    })
  }

  saveClick(){
    if(this.submitting){
      return
    }
    this.submitting = true;
    //保存图片
    var self = this;
    if (this.Images.length > 0) {
      var result: any = [];
      var ObservableObj: any = null;
      var ObservableArray: any = [];
      _.each(this.Images, function (obj) {
        if (typeof obj.content != 'undefined') {
          let formData = new FormData();
          formData.append("file", obj.fileItem._file);
          formData.append("tableid",  self.task.processinstanceid);
          formData.append("tablename",  self.materialname);
          formData.append("filepath",self.materialname)
          formData.append("remark",self.materialname)
          formData.append("enterpriseid",self.comservices.getEnterPrise)
          ObservableArray.push(self.dataServices.fileupload(formData));
        }
      })
      if(ObservableArray.length == 0){
        return;
      }
      var load = self.msg.loading("正在上传请稍后.....")

      forkJoin(ObservableArray).subscribe(t => {
        this.submitting = false;
        var bFlag = false;
        self.msg.remove(load.messageId)
        //清除原先未上传的数据
        var indexarray = [];
        self.Images = _.filter(self.Images,function(obj){
          return obj.content == null
        })
        //添加上传成功的数据
        _.each(t, function (obj) {
          if (obj == null) {
            bFlag = true;
          } else {
            obj.filepath = WebConfig.BaseUrl + WebConfig.RequestUrl.dpworksiteservices+ obj.data.filepath;
            self.Images.push(obj);
          }
        })
        this.msg.success("上传完成")
      })
    } else {
      this.closeModal();
    }
  }

  cancelClick(){
    this.closeModal();
  }
  
  closeModal() {
  }

  ImageItemClick(item){
    var imageItem = Object.assign({},item)
    if(imageItem.content &&imageItem.filepath == null){
      imageItem.filepath = imageItem.content
    }
    ComFun.ImageViewer(imageItem,true)
  }

}
