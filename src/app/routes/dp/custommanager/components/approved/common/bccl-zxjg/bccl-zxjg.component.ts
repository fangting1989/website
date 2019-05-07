import { Component, OnInit,Input } from '@angular/core';
import { NzMessageService, NzModalRef,NzModalService } from 'ng-zorro-antd';
import { dataServices } from '../../../../services';
import { Enums } from './../../../../../../../shared/utils/enums';
import { comservices } from '../../../../../../../shared/services';
import { UUID } from 'angular2-uuid';
import { ModalHelper } from '@delon/theme';
import {_} from 'underscore'
import { Utils} from './../../../../../../../shared/utils/utils';
import * as moment from  'moment'
import {MaterialUploadImagesComponent} from './../material-upload-images/material-upload-images.component'
@Component({
  selector: 'app-component-bccl-zxjg',
  templateUrl: './bccl-zxjg.component.html',
  styleUrls: [ './bccl-zxjg.component.scss']
})
export class BcclZxjgComponent implements OnInit {
  @Input() dataItem:any
  @Input() ComponentMode:any = 'read'
  EnterPriseCode:any;
  modelbh:any = {}
  model:any = {}
  ProinstList:any;
  LXRArray:any = []
  DBRArray:any = []
  submitting:any = false;
  DBRObject:any = {
    name:'担保人材料',
    index:3,
    imgs:[{name:'户口本',imgarray:[],imgname:'fjcl-dbrcl-hkb',active:3},
    {name:'身份证',imgarray:[],imgname:'fjcl-dbrcl-sfz',active:3},
    {name:'结婚证',imgarray:[],imgname:'fjcl-dbrcl-jhz',active:3},
    {name:'房产证',imgarray:[],imgname:'fjcl-dbrcl-fcz',active:3},
    {name:'购房合同',imgarray:[],imgname:'fjcl-dbrcl-gfht',active:3},
    ]
  }
  imageCollection:any = [{
    name:'合伙区域材料',
    index:1,
    imgs:[{name:'营业执照',imgarray:[],imgname:'fjcl-hhqycl-yyzz'},
    {name:'银行卡',imgarray:[],imgname:'fjcl-hhqycl-yhk'},]
  },{
    name:'合伙本人材料',
    index:2,
    imgs:[{name:'户口本',imgarray:[],imgname:'fjcl-hhbrcl-hkb'},
    {name:'身份证',imgarray:[],imgname:'fjcl-hhqycl-sfz'},
    {name:'结婚证',imgarray:[],imgname:'fjcl-hhqycl-jhz'},
    {name:'房产证',imgarray:[],imgname:'fjcl-hhqycl-fcz'},
    {name:'购房合同',imgarray:[],imgname:'fjcl-hhqycl-gfht'},
    ]
  },{
    name:'其他材料',
    index:4,
    imgs:[{name:'其他材料',imgarray:[],imgname:'fjcl-img-qrcl'},
    ]
  }]


  constructor(
    private msg: NzMessageService,
    private dataServices: dataServices,
    private modal: NzModalRef,
    private comservices: comservices,
    private modalService:NzModalService,
    private modalHelper:ModalHelper,
  ) { 
    this.EnterPriseCode = comservices.getEnterPrise
  }

  ngOnInit() {
    this.InitData()
    this.loadZx();
  }

  InitData(){
    this.loadLinkpartnerList();
  }
  //加载担保人信息
  loadLinkpartnerList(){
    var self = this;
    var postData = {
      pagesize:100,
      pagenum:1,
      linktype:2,
      enterpriseid: this.EnterPriseCode,
      partnerid:this.dataItem.keycode
    }
    this.dataServices.tlinkpartnerList(postData).subscribe(result => {
      if (result != null) {
        if(result.data.length >0){
          this.DBRArray = _.filter(result.data,it=>{return it.linktype == 2}) ;
        }
        //改造对应的数据
        if(this.DBRArray.length == 0){
          this.imageCollection.push(this.DBRObject)
        }else{
          _.each(this.DBRArray,it=>{
            var itdata = Object.assign({}, self.DBRObject);
            _.each(itdata.imgs,obj=>{
              obj.imgname = obj.imgname +'-'+ it.keycode
              //去除
              delete obj.active
            })
            itdata.active = true
            self.imageCollection.push(this.DBRObject)
          })
        }
      }
      self.imageCollection = _.sortBy(self.imageCollection, function(iiitem){ return iiitem.index; });
      //加载图片数据
      self.loadData();
    })
  }

  

  loadData(){
    var self = this;
    var postData = {
      pagesize:200,
      tablename: 'fjcl-images',
      tableid:this.dataItem.keycode
    }

    this.dataServices.loadImg(postData).subscribe(result => {
      if (result != null) {
        var has = false;
        _.each(result.data,function(dataitem){
          var has = false;
          //绑定对应的项
          _.each(self.imageCollection,iit =>{
              _.each(iit.imgs,iiit=>{
                if(iiit.imgname == dataitem.remark){
                  dataitem.filepath = WebConfig.BaseUrl + WebConfig.RequestUrl.fileuploadpath+ dataitem.filepath;
                  iiit.imgarray.push(dataitem)
                }
              })
          })
        })
        self.refreshSwiper();
      }
    })
  }

  loadZx(){
    var self = this;
    var postData = {
      pagesize:1,
      pagenum:1,
      enterpriseid: this.EnterPriseCode,
      partnerid:this.dataItem.keycode
    }
    this.dataServices.tcreditmsgList(postData).subscribe(result => {
      if (result != null && result.data.length) {
        this.model = result.data[0]
      }
    })
  }


  ImageItemClick(item){
    if(item.active == 3){
      this.msg.error("请填写担保人");
      return;
    }
    var self = this;
    item.keycode = this.dataItem.keycode
    item.imgtype = "fjcl-images"
    //设置成编辑模式
    item.componentmode = this.ComponentMode;
    var self = this;
    var data = {HeadText:'图片信息',itemdata:item}
    const modal = this.modalHelper.create(MaterialUploadImagesComponent,{ data: data},{size:800}).subscribe(res => {
      if(res){
        item.imgarray = _.filter(res.imgarray, function(it){ return it.filepath != null });
          self.refreshSwiper();
      }  
    });
  }

  saveClick() {
    var self = this;
    if(this.submitting){
        return
    }
    this.submitting = true;
    var self = this;
    this.model.enterpriseid = this.EnterPriseCode
    if (this.model.keycode) {
      this.dataServices.tcreditmsgUp(this.model).subscribe(result => {
        this.submitting = false
        if (result != null) {
          self.model = result.data;
          self.msg.success("操作成功!");
        }
      })
    } else {
      console.log(this.dataItem)
      this.model.partnerid = this.dataItem.keycode
      this.dataServices.tcreditmsgIn(this.model).subscribe(result => {
        this.submitting = false
        if (result != null) {
          self.model = result.data;
          self.msg.success("操作成功!");
        }
      })
    }
  }

  refreshSwiper(){
    setTimeout(function(){
      var mSwiper = new Swiper('.swiper-container',{
        pagination: {
          el: '.swiper-pagination',
        },
        autoplay: {
          delay: 1000,//1秒切换一次
        },
      }) 
    },1000)
  }

}

