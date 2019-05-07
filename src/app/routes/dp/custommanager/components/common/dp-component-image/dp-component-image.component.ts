import { Component, OnInit,Input } from '@angular/core';
import { NzMessageService, NzModalRef,NzModalService } from 'ng-zorro-antd';
import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { ModalHelper } from '@delon/theme';
import {GlobalState} from './../../../../../../core/common';
import { dataServices } from '../../../services';
import {_} from 'underscore';
import { forkJoin, of, interval } from 'rxjs';
import { comservices} from '../../../../../../shared/services';

@Component({
  selector: 'app-dp-component-image',
  templateUrl: './dp-component-image.component.html',
  styleUrls: ['./dp-component-image.component.scss']
})
export class DpComponentImageComponent implements OnInit {

  @Input() dataItem:any
  @Input() mode:any
  Images: any = [];
  renderObject: any = null;
  data: any;
  model: any = {}
  submitting:any = false;
  EnterPriseCode:any;
  @Input() ComponentMode:any = "read"
  @Input() imgtype:any;
  IsshowImages:any = false;
  ShowImagePath:any = "#";

  constructor(public msg: NzMessageService,
    private modal: NzModalRef,
    private modalHelper:ModalHelper,
    private modalService:NzModalService,
    private dataServices:dataServices,
    private comservices:comservices) { 
      this.EnterPriseCode = comservices.getEnterPrise
    }

  ngOnInit() {
    this.renderObject = new FileReader();
    if (this.data) {
      if (!this.data.HeadText) {
        this.data.HeadText = "内容编辑"
      }
      if (this.data.itemdata) {
        this.model = Object.assign({}, this.data.itemdata);
        if(this.model.componentmode){
          this.ComponentMode = this.model.componentmode;
        }
        
        if(this.model.imgtype){
          this.imgtype = this.model.imgtype;
        }else{
          
        }
        if(!this.imgtype || !this.ComponentMode ){
          this.msg.error("未配置组件模式或图片类别");
          return;
        }
        //如果已经传入对应的图片,则不加载图
        if(this.model.imgarray){
          this.Images = this.model.imgarray
        }else{
          this.loadData();
        }
      }
    }else{
      this.msg.error("对不起,参数错误！");
    }
  }

  loadData(){
    var self = this;
    var postData = {
      pagesize:200,
      tablename: this.imgtype,
      tableid:this.model.keycode
    }
    this.dataServices.loadImg(postData).subscribe(result => {
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
            dataitem.filepath = WebConfig.BaseUrl + WebConfig.RequestUrl.fileuploadpath+ dataitem.filepath;
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
  deleteImg(oobj) {
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
          self.dataServices.ImgDel(postData).subscribe(result => {
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
          formData.append("tableid", self.model.keycode);
          formData.append("tablename",  this.imgtype);
          formData.append("filepath",this.imgtype)
          formData.append("remark",self.model.imgname)
          ObservableArray.push(self.dataServices.uploadImg(formData));
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
            obj.filepath = WebConfig.BaseUrl + WebConfig.RequestUrl.fileuploadpath+ obj.filepath;
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
    this.model.imgarray = this.Images;
    this.modal.close(this.model);
    this.modal.destroy();
  }

  ImageItemClick(item){
    var imageItem = Object.assign({},item)
    if(imageItem.content &&imageItem.filepath == null){
      imageItem.filepath = imageItem.content
    }
    ComFun.ImageViewer(imageItem,true)
  }
}
