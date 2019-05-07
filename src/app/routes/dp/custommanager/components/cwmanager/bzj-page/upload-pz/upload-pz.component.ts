import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzModalRef,NzModalService } from 'ng-zorro-antd';
import { dataServices } from '../../../../services';
import { Enums } from './../../../../../../../shared/utils/enums';
import { comservices } from '../../../../../../../shared/services';
import { UUID } from 'angular2-uuid';
import {_} from 'underscore'
import { Utils} from './../../../../../../../shared/utils/utils';
import * as moment from  'moment'
import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { forkJoin, of, interval } from 'rxjs';

@Component({
  selector: 'app-upload-pz',
  templateUrl: './upload-pz.component.html',
  styleUrls: ['./upload-pz.component.scss']
})
export class UploadPzComponent implements OnInit {
  data: any;
  ComponentMode:any;
  model: any = {}
  EnterPriseCode: any;
  submitting:any = false;
  dataItem:any={}
  // values:any;
  Images: any = [];
  renderObject: any = null;
  TotalSY_YXJ:any = 0.0;
  TotalSY_JCBZJ:any = 0.0;
  TotalSY_ZLBZJ:any = 0.0;
  constructor(private msg: NzMessageService,
    private dataServices: dataServices,
    private modal: NzModalRef,
    private comservices: comservices,
    private modalService:NzModalService
  ) {
    this.EnterPriseCode = comservices.getEnterPrise
  }

  ngOnInit() {
    this.renderObject = new FileReader();
    if (this.data) {
      if (!this.data.HeadText) {
        this.data.HeadText = "内容编辑"
      }
      if (this.data.itemdata) {
        this.dataItem = Object.assign({}, this.data.itemdata);
      }
    }
    this.InitData();
  }

  InitData(){
    this.loadMoney()
  }

  loadMoney(){
    var self = this;
    var postData = {
      partnerid:this.dataItem.keycode,
      alldata:1
    }
    this.dataServices.needmoney(postData).subscribe(result => {
      if (result != null) {
        if(result.data.length == 1 && result.data[0]== null){
          this.TotalSY_YXJ = this.dataItem.yxj 
          this.TotalSY_JCBZJ = this.dataItem.jbbzj
          this.TotalSY_ZLBZJ = this.dataItem.zlbzj
        }
        else{
          this.TotalSY_YXJ = Utils.accSub(this.dataItem.yxj,result.data[0].yxj)
          this.TotalSY_JCBZJ =Utils.accSub(this.dataItem.jbbzj,result.data[0].jcbzj)
          this.TotalSY_ZLBZJ =Utils.accSub(this.dataItem.zlbzj,result.data[0].zlbzj)
        }
      }
    })
    
  }


  saveClick() { 
    //判断条件
    if(this.Images.length  == 0){
      this.msg.error("请选择图片")
      return;
    }
    var self = this;
    if(this.submitting){
        return
    }
    this.submitting = true; 
    var self = this;
    this.model.yxj = 0;
    this.model.enterpriseid = this.EnterPriseCode
    this.model.isvalid =1 
    this.model.createperson = this.comservices.getUserName
    this.model.partnerid = this.dataItem.keycode
    this.model.createdate = moment();
    this.dataServices.tneedmoneyIn(this.model).subscribe(result => {
      this.submitting = false
      if (result != null) {
        self.model = result.data;
        self.msg.success("操作成功!");
        self.saveImageClick();
      }
    })
  }

  cancelClick() {
    this.closeModal();
  }

  closeModal() {
    this.modal.close(true);
    this.modal.destroy();
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


  saveImageClick(){
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
          formData.append("tablename",  'needmoney-pz');
          formData.append("filepath",'needmoney-pz')
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
        this.closeModal();
      })
    } else {
      this.closeModal();
    }
  }

}

