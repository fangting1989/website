import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { dataServices } from '../../../services';
import { Enums } from './../../../../../shared/utils/enums';
import { comservices } from '../../../../../shared/services';
import { Router, ActivationEnd, ActivatedRoute } from '@angular/router';
import { DomSanitizer,SafeUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-tproduct-edit',
  templateUrl: './tproduct-edit.component.html',
  styleUrls: ['./tproduct-edit.component.scss']
})
export class TProductEditComponent implements OnInit {
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
  @ViewChild('file')
  file: ElementRef;

  constructor(private msg: NzMessageService,
    private dataServices: dataServices,
    private comservices: comservices,
    private route:ActivatedRoute,
    private sanitizer:DomSanitizer,
    private router:Router,
  ) {
    this.EnterPriseCode = comservices.getEnterPrise
  }

  ngOnInit() {
    this.loadData();
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
          //开拍时间
          this.model.kpsj = []

          if(this.model.pmstartdate){
            this.model.kpsj.push(this.model.pmstartdate)
          }else{
            this.model.kpsj.push(null)
          }
          if(this.model.pmenddate){
            this.model.kpsj.push(this.model.pmenddate)
          }else{
            this.model.kpsj.push(null)
          }
        }
      })
    }else{
      // this.loadTreeData();
    }
  }

  saveClick() {
    if(this.submitting){
        return
    }
    this.submitting = true;
    var self = this;
    this.model.enterpriseid = this.EnterPriseCode
    if (this.model.keycode) {
      this.dataServices.tproductUp(this.model).subscribe(result => {
        this.submitting = false
        if (result != null) {
          self.model = result.data;
          self.uploadImg(self.model.keycode);
          self.closeModal();
        }
      })
    } else {
      this.dataServices.tproductIn(this.model).subscribe(result => {
        this.submitting = false
        if (result != null) {
          self.model = result.data;
          self.uploadImg(self.model.keycode);
          self.closeModal();
        }
      })
    }
  }

  cancelClick() {
    this.closeModal();
  }

  closeModal() {
 
  }
  goProductPage(){
    this.router.navigate(['/dppaimai/tproductlist']);
  }
  onbmChange(event){
    this.model.signenddate = event;
  }
  onkpChange(event){
    if(event.length == 0){
      return;
    }
    if(event.length >= 1){
      this.model.pmstartdate = event[0]
    }
    if(event.length >= 2){
      this.model.pmenddate = event[1]
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
    formData.append("tablename", "paimai");
    formData.append("filepath","paimai")
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
}
