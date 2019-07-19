import { Component, OnInit } from '@angular/core';
import { GlobalState } from './../../../../../core/common';
import { dataServices } from '../../../services';
import { _ } from 'underscore';
import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { Enums } from './../../../../../shared/utils/enums';
import {
  NzMessageService,
  NzModalService
} from 'ng-zorro-antd';
import { ModalHelper } from '@delon/theme';
import { comservices } from '../../../../../shared/services';
import { TWebcoreEditComponent } from '../twebcore-edit/twebcore-edit.component'
import { MainpageAdComponent} from '../mainpage-ad/mainpage-ad.component';
import { MainpageTypeComponent} from '../mainpage-type/mainpage-type.component';
@Component({
  selector: 'app-twebcore-list',
  templateUrl: './twebcore-list.component.html',
  styleUrls: ['./twebcore-list.component.less']
})
export class TWebcoreListComponent implements OnInit {
  MainpicList: any = [];
  Mainpictype: any = { tablename: 'sell-shop-mainpic', tableid:-1, remark: '10' };
  FLpictList: any = []
  FLpictype: any = { tablename: 'sell-shop-FLpic', tableid:-1, };
  Images: any = []
  renderObject: any = null;
  EnterPriseCode: any;
  submitting: any = false;
  EditMainIndexVisible: any = false;
  EditMainPic: any = {};

  EditFLVisible:any = false;
  EditFLPic:any = {};

  typeArray:any = Object.assign([], Enums.typeTJArray);

  DataList_TJ:any = []
  searchObject:any = {};
  PageNum:any = 1;
  PageSize:any = 10;
  TotalCount_TJ:any = 0;
  expandForm:any = false;
  loading = false;

  ProductList:any = []

  DataList_ad:any = []

  TypeDataList:any = [{name:'设定',value:1},{name:'设定',value:2},{name:'设定',value:3},{name:'设定',value:4},{name:'设定',value:5}]
  gridStyle = {
    width: '20%',
    textAlign: 'center'
  };
  

  TotalCount_ad:any = 0;
  constructor(
    public msg: NzMessageService,
    private modalService: NzModalService,
    private modalHelper: ModalHelper,
    private dataServices: dataServices,
    private comservices: comservices,
    private _state: GlobalState
  ) {
    this.EnterPriseCode = comservices.getEnterPrise
  }

  ngOnInit() {
    this.renderObject = new FileReader();
    //加载首页图片
    this.loadPicData(this.Mainpictype, this.MainpicList);
    //
    this.loadPicData(this.FLpictype, this.FLpictList);

    this.loadData_TJ();

    this.loadData_ad();

    this.loadData_type();

    this.loadProductList();
  }

  public uploader: FileUploader = new FileUploader({
    itemAlias: "uploadedfile"
  });

  // 上传图片缩略图
  upload(event: any, type) {
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
        this.savePic(imgObj, type)
      }
    }
  }

  /**推荐商品 */
  loadData_TJ(){
    var self = this;
    var postData = {
      pagesize:100,
      pagenum:1,
      enterpriseid: this.EnterPriseCode,
      webcoretype:20
    }
    this.dataServices.twebcoreList(postData).subscribe(result => {
      if (result != null) {
        self.DataList_TJ = result.data;
        _.each(self.DataList_TJ,it=>{
          it.imgpath=WebConfig.BaseUrl + WebConfig.RequestUrl.fileuploadpath+ it.webcoreurl;
          _.each(self.typeArray,iit=>{
            if(iit.value == it.webcorewords){
              it.webcorewords_enum =  iit.name
            }
          })
          self.loadProduct(it)
        }) 
        self.TotalCount_TJ = result.recordcount;
      }
    })
  }
  loadProduct(it){
    var postData = {
      pagesize:1,
      pagenum:1,
      keycode:it.webcoreimage,
      enterpriseid: this.EnterPriseCode,
    }
    this.dataServices.tproductList(postData).subscribe(result => {
      if(result && result.data.length > 0){
        it.productname = result.data[0].productname
      }
    })
  }
  deleteItem_TJ(item){
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
        self.dataServices.twebcoreDel(postData).subscribe(result => {
          if (result != null) {
            self.msg.success("删除成功!");
            self.loadData_TJ()
          }
        })
      },
      nzCancelText: '取消',
      nzOnCancel  : () => {

      }
    });
  }

  addTJClick(){
    var data = {HeadText:'编辑'}
    const modal = this.modalHelper.create(TWebcoreEditComponent,{ data: data},{size:800}).subscribe(res => {
      this.loadData_TJ()
    });
  }

  editItem_TJ(item){
    var data = {HeadText:'编辑',itemdata:item}
    const modal = this.modalHelper.create(TWebcoreEditComponent,{ data: data},{size:800}).subscribe(res => {
      this.loadData_TJ()
    });
  }

  /****** */

  /*** 广告位 */
  loadData_ad(){
    var self = this;
    var postData = {
      pagesize:100,
      pagenum:1,
      enterpriseid: this.EnterPriseCode,
      webcoretype:30
    }
    this.dataServices.twebcoreList(postData).subscribe(result => {
      if (result != null) {
        self.DataList_ad = result.data;
        _.each(self.DataList_ad,it=>{
          it.imgpath=WebConfig.BaseUrl + WebConfig.RequestUrl.fileuploadpath+ it.webcoreurl;
          self.loadProduct(it)
        }) 
      }
      
    })

  }
  deleteItem_ad(item){
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
        self.dataServices.twebcoreDel(postData).subscribe(result => {
          if (result != null) {
            self.msg.success("删除成功!");
            self.loadData_ad()
          }
        })
      },
      nzCancelText: '取消',
      nzOnCancel  : () => {

      }
    });
  }

  addClick_ad(){
    var data = {HeadText:'编辑'}
    const modal = this.modalHelper.create(MainpageAdComponent,{ data: data},{size:800}).subscribe(res => {
      this.loadData_ad()
    });
  }

  editItem_ad(item){
    var data = {HeadText:'编辑',itemdata:item}
    const modal = this.modalHelper.create(MainpageAdComponent,{ data: data},{size:800}).subscribe(res => {
      this.loadData_ad()
    });
  }
  /******/

  /** 类别设定 */
  loadData_type(){
    var self = this;
    var postData = {
      pagesize:100,
      pagenum:1,
      enterpriseid: this.EnterPriseCode,
      webcoretype:40
    }
    this.dataServices.twebcoreList(postData).subscribe(result => {
      if (result != null) {
        _.each(self.TypeDataList,iit=>{
          _.each(result.data,it=>{
            if(iit.value == it.webcorevalid){
              iit.typename = it.webcorecontent
              iit.typecode = it.webcoreimage
              iit.obj = it
            }
          })
        })
      }
    })

  }

  editType(item){
    if(!item.obj){
      item.obj = {
        webcorevalid:item.value
      }
    }
    var data = {HeadText:'编辑',itemdata:item.obj}
    const modal = this.modalHelper.create(MainpageTypeComponent,{ data: data},{size:800}).subscribe(res => {
      this.loadData_type()
    });
  }

  /*********************/

  //编辑顺序
  editIndex(item) {
    this.EditMainPic = Object.assign({}, item);
    this.EditMainIndexVisible = true;
  }
  EditMain_handleCancel() {
    this.EditMainIndexVisible = false;
  }
  EditMain_handleOk() {
    var self = this;
    var postData = {
      keycode: this.EditMainPic.keycode,
      remark: this.EditMainPic.remark,
      fileurl:this.EditMainPic.fileurl,
    }
    self.dataServices.updatefileremark(postData).subscribe(result => {
      this.EditMainIndexVisible = false;
      if (result) {
        this.msg.success("操作成功");
        _.each(this.MainpicList, it => {
          if (it.keycode == this.EditMainPic.keycode) {
            it.remark = this.EditMainPic.remark;
            it.fileurl = this.EditMainPic.fileurl;
          }
        })
        this.MainpicList = _.sortBy(this.MainpicList, function (it) { return parseInt(it.remark); });
      }
    })
  }

  //编辑分类
  editFLPic(item){
    this.EditFLPic = Object.assign({}, item);
    this.EditFLVisible = true;
  }

  EditFL_handleCancel(){
    this.EditFLVisible = false;
  }

  EditFL_handleOk(){
    var self = this;
    var postData = {
      keycode: this.EditFLPic.keycode,
      remark: this.EditFLPic.fileurl,
      fileurl:this.EditFLPic.fileurl,
    }
    self.dataServices.updatefileremark(postData).subscribe(result => {
      this.EditFLVisible = false;
      if (result) {
        this.msg.success("操作成功");
        _.each(this.FLpictList, it => {
          if (it.keycode == this.EditFLPic.keycode) {
            it.remark = this.EditFLPic.remark;
            it.fileurl = this.EditFLPic.fileurl;
          }
        })
        this.FLpictList = _.sortBy(this.FLpictList, function (it) { return parseInt(it.remark); });
      }
    })
  }

  /**通用方法* */
  getImages(type) {
    var images = null;
    if (type.tablename == 'sell-shop-mainpic') {
      images = this.MainpicList
    } else if (type.tablename == 'sell-shop-FLpic') {
      images = this.FLpictList
    }
    return images
  }
  delItem(oobj, type) {
    var Images = this.getImages(type);
    var self = this;
    this.modalService.confirm({
      nzTitle: '提示',
      nzContent: '<b style="color: red;">是否确认删除对象</b>',
      nzOkText: '确定',
      nzOkType: 'danger',
      nzOnOk: () => {
        var postData = {
          keycode: oobj.keycode
        }
        self.dataServices.ImgDel(postData).subscribe(result => {
          if (result) {
            this.msg.success("删除成功!");
            //删除对应的图片
            var index = _.indexOf(Images, oobj)
            if (index > -1) {
              Images.splice(index, 1);
              //Images = Images.slice();
            }
            console.log(Images)
          }
        })
      }
    })
  }

  savePic(obj, type) {
    var images = this.getImages(type)
    console.log(images)
    if (this.submitting) {
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
      formData.append("tablename", type.tablename);
      formData.append("filepath", type.tablename)
      formData.append("remark", type.remark)
      formData.append("enterpriseid", this.comservices.getEnterPrise)
      self.dataServices.uploadImg(formData).subscribe(oobj => {
        this.submitting = false;
        var bFlag = false;
        self.msg.remove(load.messageId)
        //清除原先未上传的数据
        var indexarray = [];
        // images = _.filter(images, function (itm) {
        //   return itm.content == null
        // })
        //添加上传成功的数据
        if (oobj == null) {
          bFlag = true;
        } else {
          oobj.filepath = WebConfig.BaseUrl + WebConfig.RequestUrl.fileuploadpath + oobj.filepath;
          images.push(oobj);
        }
        this.msg.success("上传完成")
      });
    }
  }



  loadPicData(type, ImageList) {
    var self = this;
    var postData = {
      pagesize: 200,
      tablename: type.tablename,
      tableid:type.tableid,
      enterpriseid:this.comservices.getEnterPrise
    }
    this.dataServices.loadImg(postData).subscribe(result => {
      if (result != null) {
        var has = false;
        _.each(result.data, function (dataitem) {
          var has = false;
          _.each(ImageList, item => {
            if (item.keycode) {
              if (item.keycode == dataitem.keycode) {
                has = true
              }
            }
          })
          if (!has) {
            dataitem.filepath = WebConfig.BaseUrl + WebConfig.RequestUrl.fileuploadpath + dataitem.filepath;
            ImageList.push(dataitem)
          }
        })
      }
    })
  }

  loadProductList(){
    var postData = {
      pagesize:1000,
      pagenum:1,
      enterpriseid: this.EnterPriseCode,
    }
    this.dataServices.tproductList(postData).subscribe(result => {
      if(result){
        this.ProductList = result.data;
      }
    })
  }
}
