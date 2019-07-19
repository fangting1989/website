import { Component, OnInit,ElementRef,ViewChild } from '@angular/core';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { dataServices } from '../../../services';
import { Enums } from './../../../../../shared/utils/enums';
import { comservices } from '../../../../../shared/services';
import { DomSanitizer,SafeUrl} from "@angular/platform-browser";
@Component({
  selector: 'app-tproductbrand-edit',
  templateUrl: './tproductbrand-edit.component.html',
  styleUrls: ['./tproductbrand-edit.component.scss']
})
export class TProductbrandEditComponent implements OnInit {
  data: any;
  model: any = {}
  EnterPriseCode: any;
  submitting:any = false;
  stateArray: any = Object.assign([], Enums.stateArray);
  paytypeArray: any = Object.assign([], Enums.paytypeArray);

  FileObject: any;
  ShowUpload:any = true;
  ImageSrc:any = '#';
  imgUrl: SafeUrl;
  dd:any = "5"
  @ViewChild('file')
  file: ElementRef;

  constructor(private msg: NzMessageService,
    private dataServices: dataServices,
    private modal: NzModalRef,
    private comservices: comservices,
    private sanitizer:DomSanitizer
  ) {
    this.EnterPriseCode = comservices.getEnterPrise
  }

  ngOnInit() {
    if (this.data) {
      if (!this.data.HeadText) {
        this.data.HeadText = "内容编辑"
      }
      if (this.data.itemdata) {
        this.model = Object.assign({}, this.data.itemdata);
        if(this.model.brandimg && this.model.brandimg != ''){
          this.ShowUpload = false;
          this.ImageSrc = WebConfig.BaseUrl + WebConfig.RequestUrl.fileuploadpath+ this.model.brandimg;
          this.file.nativeElement.value = null;
        }
      }
    }
    this.model.selected = false;
  }

  /*loadData(){
    var self = this;
    this.model = {}
    this.model.keycode = this.route.snapshot.queryParams["keycode"];
    this.dataServices.tproductbrandList(this.model).subscribe(result => {
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
      this.dataServices.tproductbrandUp(this.model).subscribe(result => {
        this.submitting = false
        if (result != null) {
          self.model = result.data;
          self.uploadImg(self.model.keycode)
        }
      })
    } else {
      this.dataServices.tproductbrandIn(this.model).subscribe(result => {
        this.submitting = false
        if (result != null) {
          self.model = result.data;
          self.uploadImg(self.model.keycode)
        }
      })
    }
  }

  cancelClick() {
    this.closeModal();
  }

  closeModal() {
    this.modal.close(true);
    this.modal.destroy();
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
            brandimg:result,
            enterpriseid:self.EnterPriseCode
          }
          this.dataServices.tproductbrandUp(postData).subscribe(result => {
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

  onChange_Start(e){
    console.log('onChange: ', e);
  }

  onChange_End(e){
    console.log('onChange: ', e);
  }

}
