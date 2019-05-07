import { Component, OnInit, ViewChild, TemplateRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NzMessageService, NzModalService,NzModalRef } from 'ng-zorro-antd';
import { ModalHelper } from '@delon/theme';
import {EnterpriseEditComponent} from '../enterprise-edit/enterprise-edit.component';
import {EnterprisePassportComponent} from '../enterprise-passport/enterprise-passport.component';
import { sysmanagerServices } from '../../services';
@Component({
  selector: 'app-enterpriselist',
  templateUrl: './enterpriselist.component.html',
  styleUrls: ['./enterpriselist.component.scss']
})
export class EnterpriselistComponent implements OnInit {

  DataList:any = []
  searchObject:any = {};
  PageNum:any = 1;
  PageSize:any = 10;
  expandForm:any = false;
  loading = false;
  StateArray:any = [{name:"有效",value:1},{name:'无效',value:0}]
  constructor(
    public msg: NzMessageService,
    private modalService: NzModalService,
    private cdr: ChangeDetectorRef,
    private modalHelper:ModalHelper,
    private sysmanagerServices:sysmanagerServices
  ) { }

  ngOnInit() {
    this.loadData();
  }

  loadData(){
    var self = this;
    var postData = {
      pagesize:this.PageSize,
      pagenum:this.PageNum,
      searchtext:this.searchObject.searchText
    }
    this.sysmanagerServices.enterpriseList(postData).subscribe(result => {
      if (result != null) {
        self.DataList = result.data;
      }
    })
  }

  SearchClick(e){
    this.loadData();
  }

  changeState(e,item){
    this.loadData();
  }

  addClick(record: any = {}){
    var data = {HeadText:'公司编辑'}
    const modal = this.modalHelper.create(EnterpriseEditComponent,{ data: data},{size:800}).subscribe(res => {
      this.loadData()
    });
  }

  editItem(item){
    var data = {HeadText:'公司编辑',itemdata:item}
    const modal = this.modalHelper.create(EnterpriseEditComponent,{ data: data},{size:800}).subscribe(res => {
      this.loadData()
    });
  }

  editPassport(item){
    var data = {HeadText:'账号编辑',itemdata:item}
    const modal = this.modalHelper.create(EnterprisePassportComponent,{ data: data},{size:400}).subscribe(res => {
      this.loadData()
    });
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
        self.sysmanagerServices.enterpriseDel(postData).subscribe(result => {
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
}
