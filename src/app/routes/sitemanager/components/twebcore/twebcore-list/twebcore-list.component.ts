import { Component, OnInit } from '@angular/core';
import {GlobalState} from './../../../../../core/common';
import { dataServices } from '../../../services';
import { _ } from 'underscore';
import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';
import {
  NzMessageService,
  NzModalService
} from 'ng-zorro-antd';
import { ModalHelper } from '@delon/theme';
import { comservices} from '../../../../../shared/services';
import { TWebcoreEditComponent} from '../twebcore-edit/twebcore-edit.component'

@Component({
  selector: 'app-twebcore-list',
  templateUrl: './twebcore-list.component.html',
  styleUrls: ['./twebcore-list.component.less']
})
export class TWebcoreListComponent implements OnInit {
  MainpicList:any = [];
  Mainpictype:any = {tablename:'sell-shop-mainpic',tableid:-1};
  Images:any = []
  renderObject: any = null;
  EnterPriseCode:any;
  submitting:any = false;
  
  constructor(
    public msg: NzMessageService,
    private modalService:NzModalService,
    private modalHelper:ModalHelper,
    private dataServices:dataServices,
    private comservices:comservices,
    private _state:GlobalState
  ) {
    this.EnterPriseCode = comservices.getEnterPrise
  }

  ngOnInit() {
    this.renderObject = new FileReader();
    this.loadMainPicData();
  }

  public uploader: FileUploader = new FileUploader({
    itemAlias: "uploadedfile"
  });

  loadMainPicData(){
    var self = this;
    var postData = {
      pagesize:200,
      tablename: this.Mainpictype.tablename,
      tableid:this.Mainpictype.tableid
    }
    this.dataServices.loadImg(postData).subscribe(result => {
      if (result != null) {
        var has = false;
        _.each(result.data,function(dataitem){
          var has = false;
          _.each(self.MainpicList,item=>{
            if(item.keycode){
              if(item.keycode == dataitem.keycode){
                has = true
              }
            }
          })
          if(!has){
            dataitem.filepath = WebConfig.BaseUrl + WebConfig.RequestUrl.fileuploadpath+ dataitem.filepath;
            self.MainpicList.push(dataitem)
          }
        })
      }
    })
  }

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
        this.savePic(imgObj)
      }

     
    }
  }

  // 删除图片
  // deleteImg(oobj) {
  //   //1.已经存在的   2.新增上传
  //   var self = this;
  //   this.modalService.confirm({
  //     nzTitle     : '提示',
  //     nzContent   : '<b style="color: red;">是否确认删除对象</b>',
  //     nzOkText    : '确定',
  //     nzOkType    : 'danger',
  //     nzOnOk      : () => {
  //       if (oobj.content != null) {
  //         var index = _.indexOf(self.Images, oobj)
  //         if (index > -1) {
  //           self.Images.splice(index, 1);
  //           self.Images = self.Images.slice();
  //         }
  //       }
  //       else {
  //         if (oobj.keycode == null) {
  //           return;
  //         }
  //         var postData = {
  //           keycode: oobj.keycode
  //         }
  //         self.dataServices.ImgDel(postData).subscribe(result => {
  //           if(result){
  //             this.msg.success("删除成功!");
  //             //删除对应的图片
  //             var index = _.indexOf(self.Images, oobj)
  //             if (index > -1) {
  //               self.Images.splice(index, 1);
  //               self.Images = self.Images.slice();
  //             }
  //           }
  //         })
  //       }
  //     }
  //   })
  // }

  savePic(obj){
    if(this.submitting){
      return
    }
    this.submitting = true;
    //保存图片
    var self = this;
      var result: any = [];
      var ObservableObj: any = null;
      var ObservableArray: any = [];
      var load = self.msg.loading("正在上传请稍后.....")
      if (typeof obj.content != 'undefined') {
        let formData = new FormData();
        formData.append("file", obj.fileItem._file);
        formData.append("tableid", '-1');
        formData.append("tablename",  this.Mainpictype.tablename);
        formData.append("filepath", this.Mainpictype.tablename)
        formData.append("remark",'')
        self.dataServices.uploadImg(formData).subscribe(t => {
          this.submitting = false;
          var bFlag = false;
          self.msg.remove(load.messageId)
          //清除原先未上传的数据
          var indexarray = [];
          self.MainpicList = _.filter(self.MainpicList,function(obj){
            return obj.content == null
          })
          //添加上传成功的数据
          _.each(t, function (obj) {
            if (obj == null) {
              bFlag = true;
            } else {
              obj.filepath = WebConfig.BaseUrl + WebConfig.RequestUrl.fileuploadpath+ obj.filepath;
              self.MainpicList.push(obj);
            }
          })
          this.msg.success("上传完成")
        });
      }
  }
}
