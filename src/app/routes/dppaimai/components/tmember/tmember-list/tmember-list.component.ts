import { Component, OnInit,ElementRef,ViewChild } from '@angular/core';
import {GlobalState} from './../../../../../core/common';
import { dataServices } from '../../../services';
import { _ } from 'underscore';
import {
  NzMessageService,
  NzModalService 
} from 'ng-zorro-antd';
import { ModalHelper } from '@delon/theme';
import { comservices} from '../../../../../shared/services';
import {Router} from '@angular/router';
import {TMemberEditdataComponent} from '../tmember-editdata/tmember-editdata.component'

@Component({
  selector: 'paimai-tmember-list',
  templateUrl: './tmember-list.component.html',
  styleUrls: ['./tmember-list.component.scss']
})
export class TMemberListComponent implements OnInit {
  DataList:any = []
  searchObject:any = {};
  PageNum:any = 1;
  PageSize:any = 10;
  TotalCount:any = 0;
  expandForm:any = false;
  loading = false;
  EnterPriseCode:any;
  FileObject: any;
  StateArray:any = [{name:"有效",value:1},{name:'无效',value:0}]
  @ViewChild('file')
  file: ElementRef;
  constructor(
    public msg: NzMessageService,
    private modalService:NzModalService,
    private modalHelper:ModalHelper,
    private dataServices:dataServices,
    private comservices:comservices,
    private _state:GlobalState,
    private router:Router,
  ) {
    this.EnterPriseCode = comservices.getEnterPrise
  }

  ngOnInit() {
    this.loadData();
  }

  loadData(){
    var self = this;
    var postData = {
      pagesize:this.PageSize,
      pagenum:this.PageNum,
      searchtext:this.searchObject.searchText,
      enterpriseid:this.comservices.getEnterPrise,
    }
    this.dataServices.tmemberList(postData).subscribe(result => {
      if (result != null) {
        self.DataList = result.data;
        self.TotalCount = result.recordcount;
      }
    })
  }

  SearchClick(e){
    this.loadData();
  }

  changeState(e,item){
    //_.each(this.StateArray,it=>{
    //  it.active = false;
    //})
    //item.active = true;
    //this.searchObject.isvalid = item.value
    this.loadData();
  }

  addClick(record: any = {}){
    var data = {HeadText:'新增'}
    const modal = this.modalHelper.create(TMemberEditdataComponent,{ data: data},{size:800}).subscribe(res => {
      this.loadData()
    });
  }

  editItem(item){
    // var data = {HeadText:'编辑',itemdata:item}
    // const modal = this.modalHelper.create(TMemberEditComponent,{ data: data},{size:800}).subscribe(res => {
    //   this.loadData()
    // });

    this.router.navigate(['/dppaimai/tmemberedit'],{ queryParams: { keycode: item.keycode } });
  }

  deleteItem(item){
    var self = this;
    this.modalService.confirm({
      nzTitle     : '提示',
      nzContent   : '<b style="color: red;">是否确认删除对象</b>',
      nzOkText    : '确定',
      nzOkType    : 'danger',
      nzOnOk      : () => {
        var postData = {
          keycode:item.keycode
        }
        self.dataServices.tmemberDel(postData).subscribe(result => {
          if (result != null) {
            self.msg.success("删除成功!");
            self.loadData()
          }
        })
      },
      nzCancelText: '取消',
      nzOnCancel  : () => {

      }
    });
  }


  downloadtemp(e){
    var self = this;
    self.dataServices.download_memberfile({}).subscribe(result => { 
      if(result){
        window.location = WebConfig.BaseUrl + WebConfig.RequestUrl.dppaimaiservices + result.data
      }
    })
  }

  uploaddata(e){

  }

  getUpload(e) {
    let path = e.target.value,
      extStart = path.lastIndexOf('.'),
      ext = path.substring(extStart, path.length).toUpperCase();
      console.log(ext)
    if (ext !== '.XLSX') {
      this.msg.error("请上传正确的07版本以上excel格式")
      return;
    }
    if (e.target.files[0]) {
      this.FileObject = e.target.files[0];
      this.uploadImg();
    }
  }

  uploadImg() {
    var self = this;
    let formData = new FormData();
    formData.append("file", this.FileObject);
    formData.append("enterpriseid", this.comservices.getEnterPrise);
    //上传图片
    if (this.FileObject) {
      this.dataServices.importmemberdata(formData).subscribe(result => {
        if(result){
          self.msg.success("操作成功!")
          self.loadData();
        }
        self.file.nativeElement.value = null;
      })
    } 
  }
}
