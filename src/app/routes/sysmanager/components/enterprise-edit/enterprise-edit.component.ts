import { Component, OnInit, Input ,ViewChild,ElementRef} from '@angular/core';
import { NzMessageService, UploadFile ,NzModalService,NzModalRef } from 'ng-zorro-antd';
import { sysmanagerServices } from '../../services';
import { DomSanitizer,SafeUrl} from "@angular/platform-browser";
@Component({
  selector: 'app-enterprise-edit',
  templateUrl: './enterprise-edit.component.html',
  styleUrls: ['./enterprise-edit.component.scss']
})



export class EnterpriseEditComponent implements OnInit {

  FileObject: any;
  ShowUpload:any = true;
  ImageSrc:any = '#';
  imgUrl: SafeUrl;
  @ViewChild('file')
  file: ElementRef;
  data:any;
  model:any = {}
  stateArray = [{name:"是",value:1,selected:false},{name:"否",value:0,selected:true}]

  smsStateArray:any = Object.assign([],this.stateArray)
  pwdStateArray:any =  Object.assign([],this.stateArray)
  constructor(private msg:NzMessageService,
    private sysmanagerServices:sysmanagerServices,
    private modal:NzModalRef,
    private sanitizer:DomSanitizer) { }

  ngOnInit() {
    if(this.data){
      if(!this.data.HeadText){
        this.data.HeadText = "内容编辑"
      }
      if(this.data.itemdata){
        this.model = Object.assign({},this.data.itemdata);
        if(this.model.logourl && this.model.logourl != ''){
          this.ShowUpload = false;
          this.ImageSrc = WebConfig.BaseUrl + WebConfig.RequestUrl.fileuploadpath+ this.model.logourl;
          this.file.nativeElement.value = null;

        }
      }
    }
    this.model.selected = false;
  }

  onChange_startdate(e){

  }

  onChange_enddate(e){

  }

  onChange_validdate(e){

  }
  saveClick(){
    var self = this;
    if(this.model.keycode){
      this.sysmanagerServices.enterpriseUpdate(this.model).subscribe(result => {
        if (result != null) {
          self.model = result.data;
          self.uploadImg(self.model.keycode)
        }
      })
    }else{
      this.sysmanagerServices.enterpriseInsert(this.model).subscribe(result => {
        if (result != null) {
          self.model = result.data; 
          self.uploadImg(self.model.keycode)
        }
        
      })
    }
  }

  cancelClick(){
    this.closeModal();
  }

  closeModal(){
    this.modal.close(true);
    this.modal.destroy();
  }

  //上传图片
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
    // formData.append("tableid", this.model.enterpriseid);
    formData.append("keycode", keycode);
    formData.append("tablename", "enterprise");
    //上传图片
    if (this.FileObject) {
      this.sysmanagerServices.uploadImg(formData).subscribe(result => {
        if(result){
          self.msg.success("操作成功!")
          self.closeModal();
        }
      })
    } else{
      self.msg.success("操作成功!")
      self.closeModal();
    }
  }
}
