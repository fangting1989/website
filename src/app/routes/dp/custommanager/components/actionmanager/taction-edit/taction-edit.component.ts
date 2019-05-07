import { Component, OnInit,ViewChild,ElementRef  } from '@angular/core';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { dataServices } from '../../../services';
import { Enums } from './../../../../../../shared/utils/enums';
import { comservices } from '../../../../../../shared/services';
import { DomSanitizer,SafeUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-taction-edit',
  templateUrl: './taction-edit.component.html',
  styleUrls: ['./taction-edit.component.scss']
})
export class TActionEditComponent implements OnInit {
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
      if(this.data.itemdata){
        this.model = Object.assign({},this.data.itemdata);
        if(this.model.actionimgurl && this.model.actionimgurl != ''){
          this.ShowUpload = false;
          this.ImageSrc = WebConfig.BaseUrl + WebConfig.RequestUrl.fileuploadpath+ this.model.actionimgurl;
          this.file.nativeElement.value = null;
        }
      }
    }
    this.model.selected = false;
  }

  saveClick() {
    if(this.submitting){
        return
    }
    this.submitting = true;
    var self = this;
    this.model.enterpriseId = this.EnterPriseCode
    if (this.model.keycode) {
      this.dataServices.tactionUp(this.model).subscribe(result => {
        this.submitting = false
        if (result != null) {
          self.model = result.data;
          self.model = result.data;
          self.uploadImg(self.model.keycode)
        }
      })
    } else {
      this.model.organizer = this.comservices.getUserName;
      this.dataServices.tactionIn(this.model).subscribe(result => {
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
        console.log(result)
        if(result){
          var postData = {
            keycode:keycode,
            actionimgurl:result,
            enterpriseId:self.EnterPriseCode
          }
          this.dataServices.tactionUp(postData).subscribe(result => {
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
