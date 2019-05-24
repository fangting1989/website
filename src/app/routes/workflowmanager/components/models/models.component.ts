import { Component, OnInit } from '@angular/core';
import { GlobalState } from './../../../../core/common';
import { dataServices } from '../../services';
import { Router } from '@angular/router';
import { _ } from 'underscore';
import {
  NzMessageService,
  NzModalService
} from 'ng-zorro-antd';
import { ModalHelper } from '@delon/theme';
import { comservices } from '../../../../shared/services';
import { ModelAddComponent } from './model-add/model-add.component';
@Component({
  selector: 'app-models',
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.scss']
})
export class ModelsComponent implements OnInit {
  DataList: any = []
  searchObject: any = {
    state: 1
  };
  PageNum: any = 1;
  PageSize: any = 10;
  TotalCount: any = 0;
  expandForm: any = false;
  loading = false;
  EnterPriseCode: any;
  StateArray: any = [{ name: "流程", value: 1 }, { name: '案例模型', value: 2 }, { name: '表单', value: 3 }, { name: '决策表', value: 4 }, { name: '应用程序', value: 5 }]
  constructor(
    public msg: NzMessageService,
    private modalService: NzModalService,
    private modalHelper: ModalHelper,
    private dataServices: dataServices,
    private comservices: comservices,
    private _state: GlobalState,
    private router: Router,
  ) {
    this.EnterPriseCode = comservices.getEnterPrise
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    var self = this;
    var postData: any = {
      pagesize: this.PageSize,
      pagenum: this.PageNum,
      enterpriseid: this.EnterPriseCode
    }
    if (this.searchObject.searchText) {
      postData.filterText = this.searchObject.searchText
    }
    this.dataServices.model_list(postData).subscribe(result => {
      if (result != null) {
        self.DataList = result.data;
        self.TotalCount = result.recordcount;
      }
    })
  }

  SearchClick(e) {
    this.loadData();
  }

  changeState(e, item) {
    this.loadData();
  }

  addClick(record: any = {}) {
    var data = { HeadText: '新增模型' }
    const modal = this.modalHelper.create(ModelAddComponent, { data: data }, { size: 800 }).subscribe(res => {
      this.loadData()
    });
  }

  editItem(item) {
    //页面跳转
    this.router.navigate(['/workflow/modeledit'], { queryParams: { modelId: item.id } });
  }

  deleteItem(item) {
    var self = this;
    this.modalService.confirm({
      nzTitle: '提示',
      nzContent: '<b style="color: red;">是否确认删除对象</b>',
      nzOkText: '确定',
      nzOkType: 'danger',
      nzOnOk: () => {
        var postData = {
          modelId: item.id
        }
        self.dataServices.model_delete(postData).subscribe(result => {
          if (result != null) {
            self.msg.success("删除成功!");
            self.loadData()
          }
        })
      },
      nzCancelText: '取消',
      nzOnCancel: () => {

      }
    });
  }

  export(item) {
    var loadding = this.msg.info("正在下载文件，请稍后..")
    var self = this;
    var postData: any = {
      modelId: item.id
    }

    this.dataServices.model_export(postData).subscribe(result => {
      this.msg.remove(loadding.messageId)
      if (result) {
        window.open(WebConfig.BaseUrl + WebConfig.RequestUrl.flowableworkflow + result.data,"_blank")
        console.log(result);
      }
    })

  }
  deploy(item) {
    var self = this;
    var postData: any = {
      modelId: item.id
    }
    this.dataServices.model_deploymodel(postData).subscribe(result => {
      if (result != null) {
        this.msg.success("发布成功!");
      }
    })

  }
}
