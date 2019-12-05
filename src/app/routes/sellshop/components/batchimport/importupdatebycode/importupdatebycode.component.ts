import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { dataServices } from '../../../services';
import { Enums } from './../../../../../shared/utils/enums';
import { comservices } from '../../../../../shared/services';
import { Router, ActivationEnd, ActivatedRoute } from '@angular/router';
import {_} from 'underscore';
@Component({
  selector: 'app-importupdatebycode',
  templateUrl: './importupdatebycode.component.html',
  styleUrls: ['./importupdatebycode.component.scss']
})
export class ImportupdatebycodeComponent implements OnInit {

  model:any ={};
  DataList:any = []
  searchObject:any = {}

  FileObject: any;
  ShowUpload:any = true;
  ImageSrc:any = '#';
  @ViewChild('file')
  file: ElementRef;

  title_desc:any = ""

  unpasscount:any = 0
  totalcount:any = 0;

  loading:any = false;

  constructor(
    private dataServices: dataServices,
    private comservices: comservices,
    private route:ActivatedRoute,
    private msg:NzMessageService,
  ) { }

  ngOnInit() {
  }

  getUpload(e) {
    let path = e.target.value,
      extStart = path.lastIndexOf('.'),
      ext = path.substring(extStart, path.length).toUpperCase();
    // if (ext !== '.PNG' && ext !== '.JPG' && ext !== '.JPEG' && ext !== '.GIF') {
    //   this.msg.error("请上传正确的图片格式")
    //   return;
    // }
    if (e.target.files[0]) {
      this.model.FileObject = e.target.files[0];
      // this.ImageSrc = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(e.target.files[0]));
      this.ShowUpload = false;
    }
  }
  upimg() {
    this.file.nativeElement.click();
  }
  closeImg() {
   this.ShowUpload = true;
   this.file.nativeElement.value = null;
   this.model.FileObject = null;
  }

  uploadImg() {
    var self = this;
    let formData = new FormData();
    formData.append("file", this.model.FileObject);
    formData.append("tablename", "importdata");
    formData.append("filepath","importdata")
    formData.append("enterpriseid",this.comservices.getEnterPrise)
    //上传图片
    if (this.model.FileObject) {
      self.title_desc = ""
      this.dataServices.importupdatebycode_check(formData).subscribe(result => {
        if(result){
          self.DataList = result
          self.totalcount = self.DataList.length
          self.unpasscount = 0;
          _.each(self.DataList,it=>{
            if(it[19] != '通过检测'){
              self.unpasscount ++
            }
          })
          var passcount = self.totalcount - self.unpasscount
          self.title_desc = "总共检测到数据["+self.totalcount+"]条,检测通过["+passcount+"]条,不通过["+self.unpasscount+"]条";
        }
      })
    } 
  }

  UploadCheckClick(event){
    this.uploadImg();
  }

  ImportClick(event){
    var self = this;
    if(self.unpasscount > 0){
      this.msg.error("数据检测未全部通过")
      return
    }
    if(self.DataList.length == 0){
      this.msg.error("请先检测数据")
      return
    }
    var postData = {
      data:self.DataList,
      enterpriseid:this.comservices.getEnterPrise,
      operateperson:this.comservices.getUserName
    }
    this.dataServices.importupdatebycode(postData).subscribe(result => {
      if(result){
        this.msg.success("导入成功!")
        this.DataList = []
        self.title_desc  = ""
      }
    })
  }
 
  downloadtemp(event){
    var self = this;
    self.dataServices.download_file({filename:'import_updateproductbycode_template.xlsx'}).subscribe(result => { 
      if(result){
        window.location = WebConfig.BaseUrl + WebConfig.RequestUrl.sellsiteservice + result.data
      }
    })
  }
}
