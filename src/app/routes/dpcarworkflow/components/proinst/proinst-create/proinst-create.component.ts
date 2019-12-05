import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzModalRef,NzModalService } from 'ng-zorro-antd';
import { dataServices } from '../../../services';
import { Enums } from './../../../../../shared/utils/enums';
import { comservices,dataServices as baseservice } from '../../../../../shared/services';
import { Router, ActivationEnd, ActivatedRoute } from '@angular/router';
import {_} from 'underscore';
import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';
import * as moment from 'moment'
import {Utils} from '../../../../../shared/utils';
@Component({
  selector: 'dpcarworkflow-proinst-create',
  templateUrl: './proinst-create.component.html',
  styleUrls: ['./proinst-create.component.scss']
})
export class ProinstCreateComponent implements OnInit {


  DataList:any = []
  searchObject:any = {
    state:1
  };
  PageMode:any = 0;
  model:any = {}
  zxmodel:any ={}
  PageNum:any = 1;
  PageSize:any = 10;
  TotalCount:any = 0;
  expandForm:any = false;
  loading = false;
  EnterPriseCode:any;
  tabindex:any = 0
  workListEnums:any = []
  chinaCity:any
  renderObject: any = null;
  StateArray:any = []
  imageList:any = [
    {name:"身份证正面",value:1},
    {name:'身份证反面',value:2},
    {name:'征信授权书',value:3},
    {name:'大数据查询授权书',value:4},
    {name:'授权书签字照片',value:5}
  ]
  Curritem:any = null;
  CurrDataRange:any = []
  CarTypeArray:any = []



  PersonList:any= [{name:'主借人',model:{customertype:10,ifzx:1,cardtimetype:0},imageList: Utils.deepClone(this.imageList),type:10,default:1}]

  constructor(
    private msg: NzMessageService,
    private dataServices: dataServices,
    private comservices: comservices,
    private route:ActivatedRoute,
    private modalService:NzModalService,
    private baseservice:baseservice
  ) { 
    this.EnterPriseCode = comservices.getEnterPrise
  }

  ngOnInit() {
    this.chinaCity = chinaCity;
    this.renderObject = new FileReader();
    this.InitData();
  }

  public uploader: FileUploader = new FileUploader({
    itemAlias: "uploadedfile"
  });



  InitData(){
    //加载业务类型
    this.loadProinstData();
    //this.zxmodel.proinsttype = [{name:'E分期',value:10},{name:'传统业务',value:20}]
    //加载办件方式
    this.loadEnum();
    this.Curritem = this.PersonList[0]
  }
  loadEnum(){
    var self = this;
    this.baseservice.loadEnum("dp_xxh_worktype").subscribe(result=>{
      if(result){
        this.workListEnums =  result.data.enums;
        this.loadBankData();
      }
    })

    this.baseservice.loadEnum("base_isvalid").subscribe(result=>{
      if(result){
        this.StateArray =  result.data.enums;
      }
    })

    this.baseservice.loadEnum("dp_xxh_cartype").subscribe(result=>{
      if(result){
        this.CarTypeArray =  result.data.enums;
      }
    })
  }

  loadBankData(){
    var postData = {
      enterpriseid:this.comservices.getEnterPrise,
      isvalid:1
    }
    this.dataServices.tbankList(postData).subscribe(result=>{
      if(result){
        this.zxmodel.bankList = result.data;
      }
    })
  }

  bankChanged(e){
    var self = this;
    self.zxmodel.workList = []
    _.each(this.zxmodel.bankList,iit=>{
      if(iit.keycode == e){
        var enum_data = iit.worktype.split(",")
        _.each(enum_data,iit=>{
          _.each(self.workListEnums,enumit=>{
            if(enumit.enumvalue == iit){
              self.zxmodel.workList.push({name:enumit.enumname ,value:enumit.enumvalue })
            }
          })
        })
      }
    })
  }

  WorkTypeChanged(e){
    if(e == 10){
      //电子签
      this.PageMode = 10
    }else if(e== 20){
      //影像签
      this.PageMode = 20
    }
  }

  //加载可办理任务
  loadProinstData(){
    var self = this;
    var postData:any = {
      pagesize:this.PageSize,
      pagenum:this.PageNum,
      enterpriseid: this.EnterPriseCode
    }
    if(this.searchObject.searchText){
      postData.filterText = this.searchObject.searchText
    }
    this.dataServices.enterprise_process(postData).subscribe(result => {
      if (result != null) { 
        self.zxmodel.proinsttype = []
        _.each(result.data,it=>{
          self.zxmodel.proinsttype.push({
            name:it.name,
            value:it.id
          })
        })
      }
    })
  }

  DateChange(e,item){
    
  }
  //增加人员
  addPerson(type){
    var index = _.findIndex(this.PersonList,it=>{
      return it.type == type
    })
    if(index > -1){
      this.msg.error("对不起，不能重复添加!")
      return;
    }
    if(type == 20){
      this.PersonList.push({name:'反担保人',canclose:true,model:{customertype:20,ifzx:0,cardtimetype:0},imageList: Utils.deepClone(this.imageList),type:20})
    }else if(type == 30){
      this.PersonList.push({name:'共同还款人',canclose:true,model:{customertype:30,ifzx:0,cardtimetype:0},imageList: Utils.deepClone(this.imageList),type:30})
    }
  }

  closeTab(item){
    var self = this;
    var index = _.findIndex(this.PersonList,it=>{
      return it.name == item.name
    })
    if (index > -1) {
      self.PersonList.splice(index, 1);
      self.PersonList = self.PersonList.slice();
    }
  }

  SelectTab(e,item){
    this.Curritem = item
  }

  //历史征信信息
  loadData(){

  }

  oncityChanges(e){
    this.model.districtcode = e[e.length - 1]
  }

  onCheckedChange(e){
    if(e){
      this.CurrDataRange = this.Curritem.model.date_range
      this.Curritem.model.date_range = []
    }else{
      this.Curritem.model.date_range = this.CurrDataRange;
    }
  }

  citySelect(e){
    _.each(e.option.children,it=>{
      if(!it.children){
        it.isLeaf = true
      }
    })
  }

  //图片加载
  // 上传图片缩略图
  upload(event: any,item) {
    var self = this;
    if (this.uploader.queue.length > 0) {
      var ImgLength = this.uploader.queue.length
      var FileObject = this.uploader.queue[ImgLength - 1]
      this.renderObject.readAsDataURL(FileObject._file);
      this.renderObject.onloadend = (e) => {
        item.content = this.renderObject.result;

        if(item.name == '身份证正面'){
          self.uploadData(1,item.content,item)
        }else if(item.name == '身份证反面'){
          self.uploadData(2,item.content,item)
        }

      }
    }
  }

  // 删除图片
  deleteImg(oobj) {
    //1.已经存在的   2.新增上传
    var self = this;
    this.modalService.confirm({
      nzTitle     : '提示',
      nzContent   : '<b style="color: red;">是否确认删除对象</b>',
      nzOkText    : '确定',
      nzOkType    : 'danger',
      nzOnOk      : () => {
        if (oobj.content != null) {
          delete oobj.content
          delete oobj.fileItem
        }
      }
    })
  }

  uploadData(type,imgdata,objectItem){
    var self = this;
    var postData = {
      type:type,
      enterpriseid:this.comservices.getEnterPrise,
      image:imgdata
    }
    this.dataServices.idcard_base64_msg(postData).subscribe(result => {
      if(result){
        if(type == 1){
          try{
            var data = JSON.parse(result.data)
            //姓名
            if(data.姓名.words == ""){
              self.msg.error("无法识别图片，请重新上传")
              delete objectItem.content
              return;
            }
            if(self.Curritem){
              //姓名
              self.Curritem.model.customername = data.姓名.words
              //身份证号
              self.Curritem.model.idcard = data.公民身份号码.words
              self.Curritem.model.houseaddress = data.住址.words
            }
            
          }catch(e){
  
          }
        }else{
          var data = JSON.parse(result.data)
          if(data.签发机关.words == ""){
            self.msg.error("无法识别图片，请重新上传")
            delete objectItem.content
            return;
          }
          if(self.Curritem){
            self.Curritem.model.organization = data.签发机关.words
            self.Curritem.model.date_range = []
            self.Curritem.model.date_range.push(moment(data.签发日期.words).format("YYYY-MM-DD"))
            if(data.失效日期.words == "长期"){
              self.Curritem.model.cardtimetype = 1;
            }else{
              self.Curritem.model.date_range.push(moment(data.失效日期.words).format("YYYY-MM-DD"))
            }
          }
        }
      }
    })

  }
  //创建业务流程
  SubmitProcess(){
    var errState = 0;
    var errmsg = "";
    //判断--手机不能为空
    _.each(this.PersonList,it=>{
      if(!it.model.customername || !it.model.mobile){
        errmsg = "用户名或手机不能为空"
        errState = 1
      }
    })
    if(errState){
      this.msg.error(errmsg);
      return;
    }
    //处理数据
    _.each(this.PersonList,it=>{
      delete it.model.startdate
      delete it.model.enddate
      if(it.model.date_range){ 
        if(it.model.date_range.length > 0){
          it.model.startdate = moment(it.model.date_range[0])
        }
        if(it.model.date_range.length > 1){
          it.model.enddate = moment(it.model.date_range[1])
        }
      }
      // 
      if(it.model.cardtimetype){
        delete it.model.enddate
      }
      it.model.worktype = this.model.worktype
    })
    var postData:any = {}
    postData.personlist = this.PersonList;
    postData.enterpriseid = this.comservices.getEnterPrise
    postData.usercode = this.comservices.getUserCode
    postData.proinsttype = this.model.proinsttype
    postData.bankid = this.model.bankid
    postData.worktype = this.model.worktype
    postData.districtcode = this.model.districtcode
    postData.cartype = this.model.cartype
    
    // 
    this.dataServices.createproinst(postData).subscribe(result=>{
      if(result){
        this.msg.success("创建流程成功!")
        window.history.go(-1)
      }
    })
  }
}
