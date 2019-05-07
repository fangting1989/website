import { Component, OnInit,ChangeDetectionStrategy,TemplateRef, ViewChild,ChangeDetectorRef } from '@angular/core';
import {GlobalState} from './../../../../core/common';
import { sysmanagerServices } from '../../services';
import { _ } from 'underscore';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  NzDropdownContextComponent,
  NzDropdownService,
  NzFormatEmitEvent,
  NzTreeComponent,
  NzTreeNode,
  NzMessageService,
  NzModalService
} from 'ng-zorro-antd';
import { Enums } from './../../../../shared/utils/enums';
import { CacheService } from '@delon/cache'
import { ModalHelper } from '@delon/theme';
import {SelEnterpriseComponent} from '../sel-enterprise/sel-enterprise.component';

@Component({
  selector: 'app-modulemanager',
  templateUrl: './modulemanager.component.html',
  styleUrls: ['./modulemanager.component.scss']
})
export class ModulemanagerComponent implements OnInit {

  model:any = {};
  hasEnterprise:any = false;
  changeHeight: number;
  TreeData:any= [];
  SelTreeData:any;
  stateArray:any = Object.assign([],Enums.stateArray);
  canselArray:any = Object.assign([],Enums.stateArray);
  explainData:any = {}
  HeadText:any = ""
  EnterPriseObject:any = {};
  expandKeys:any = []
  defaultEnterPriseObject:any = {
    keycode:-1,
    enterprisename:'后台管理'
  }
  constructor(
    private _state: GlobalState,
    private nzDropdownService: NzDropdownService,
    private sysService: sysmanagerServices,
    private fb: FormBuilder, 
    private msg: NzMessageService,
    private cdr: ChangeDetectorRef,
    private cacheService:CacheService,
    private modalHelper:ModalHelper,
    private modalService:NzModalService

  ) {
    this._state.notifyDataChanged('app.nav', { level: 1, NavName: "模块管理", routerLink: "./sysmanager/modulemanager" });
    this.changeHeight = window.innerHeight - 170;
  }
  
  ngOnInit() {
    var self = this;
    window.onresize = function () {
      self.changeHeight = window.innerHeight - 170;
    }
    this.loadEnterprise();
  }

  loadEnterprise(){ 
    this.EnterPriseObject = this.cacheService.getNone(WebConfig.EnterPriseCookie.name)
    if(!this.EnterPriseObject){
      this.hasEnterprise = false;
      //默认没有加载后台管理
      //this.SelEnterPrise();
      this.EnterPriseObject = this.defaultEnterPriseObject
      this.LoadTreeData();
    }else{
      this.hasEnterprise = true;
      //加载数据
      this.LoadTreeData();
    }
  }

  SelEnterPrise(){
    const modal = this.modalHelper.create(SelEnterpriseComponent,{ },{size:800}).subscribe(res => {
      this.loadEnterprise()
    });
  }

  SelDefault(){
    this.hasEnterprise = true;
    this.EnterPriseObject = this.defaultEnterPriseObject
    this.LoadTreeData();
  }

  //----------
  LoadTreeData(){
    this.model = {}
    this.SelTreeData = [{key:"-1",title:"默认类别",type:'nodetype',isLeaf:true}]
    //加载默认数据
    this.loadChildTreeData(-1,null,null)
  }

  TreeChild(e,type){
    if(e.eventName == 'expand'){
      try{
        if(e.node.origin.type == "nodetype"){
          //清空当前节点子节点
         this.loadChildTreeData(e.node.key,e,type)
        }
      }catch(ex){
        e.node.isLoading = false
      }
      
    }
  }

  TreeItemClick(event){
    if(event.node){
      this.model = event.node.origin
    }
  }

  
  loadChildTreeData(pId,event,type){
    if(event){
      event.node.clearChildren();
    }
    var self = this;
    var postData = {
      modulepid:pId,
      enterpriseid:this.EnterPriseObject.keycode
    }
    this.sysService.findmenubyparent(postData).subscribe(result => {
      if(result){
        var mmmdata:any = [];
        _.each(result.data,item =>{
          item.key =  item.moduleid
          item.title = item.modulename
          if(item.cansel == 1){
            item.type = "nodetype" 
            item.icon = item.moduleicon
          }else{
            item.type = "node"
            item.isLeaf = true
          }
          mmmdata.push(item)
        })
        if(!event){ 
          //初始化数据
          self.TreeData = mmmdata;
          var obdata = Object.assign([],self.SelTreeData)
          _.each(mmmdata,item=>{
            obdata.push(item);
          })
          self.SelTreeData = _.filter(obdata,item=>{
            return item.type == "nodetype"
          })
        }else{
          //选择 添加目录
          if(type){
            var dataArray = _.filter(mmmdata,item=>{
              return item.type == "nodetype"
            })
            event.node.addChildren(dataArray)
          }else{
            event.node.addChildren(mmmdata)
          }
        }
      }
      if(event){
        event.node.isLoading = false
      }
    })
  }

  addClick(){
    this.model = {
      isvalid:1
    }
  }

  SelIsMenuItem(e){
  }

  okClick(){
    var self = this;
    this.model.enterpriseid = this.EnterPriseObject.keycode
    //保存
    if(this.model.keycode){
      this.sysService.upModule(this.model).subscribe(result => {
        if(result){
          this.msg.success("操作成功!");
          self.LoadTreeData();
        }
      })
    }else{
      this.sysService.inModule(this.model).subscribe(result => {
        if(result){
          this.msg.success("操作成功!");
          self.LoadTreeData();
        }
      })
    }
  }

  deleteClick(){
    this.model
    var self = this;
    //类别删除
    var self = this;
    this.modalService.confirm({
      nzTitle     : '提示',
      nzContent   : '<b style="color: red;">是否确认删除对象</b>',
      nzOkText    : '确定',
      nzOkType    : 'danger',
      nzOnOk      : () => {
        var postData = {
          keycode:self.model.keycode
        }
        self.sysService.delModule(postData).subscribe(result => {
          if (result != null) {
            self.msg.success("删除成功!");
            self.LoadTreeData();
          }
        })
      },
      nzCancelText: '取消',
      nzOnCancel  : () => {
      
      }
    });
  }


  // loadTree() {
  //   var self = this;
  //   //配置
  //   var setting = {
  //     view: {
  //       dblClickExpand: false,
  //       showLine: true
  //     },
  //     data: {
  //       simpleData: {
  //         enable: true
  //       }
  //     },
  //     callback: {
  //       beforeClick: beforeClick.bind(this),
  //       beforeExpand: beforeExpand.bind(this),
  //     }
  //   };
  //   this.TreeSetting = setting;
  //   //单击节点
  //   function beforeClick(treeId, treeNode, clickFlag) {
  //     let typeId = treeNode.id.substring(0, treeNode.id.lastIndexOf('_'));
  //     if (typeId == 'system') {
  //       // console.log(treeNode)
  //       this.loadSystemDetail(treeNode)
  //       this.typeItemBox = 1;
  //       this.okType = 'systemBj';
  //       this.startValue = treeNode.pId;

  //     } else {
  //       this.loadModuleDetail(treeNode);
  //       this.typeItemBox = 2;
  //       this.okType = 'moduleBj';
  //       this.startValue = treeNode.pId;

  //     }

  //   }
  //   //展开/折叠父节点
  //   function beforeExpand(treeId, treeNode, clickFlag) {
  //     let typeId = treeNode.id.substring(0, treeNode.id.lastIndexOf('_'));
  //     if (typeId == 'system') {
  //       this.loadModule(treeNode);
  //     }
  //   }
  //   //加载系统列表
  //   this.loadSystem();
  // }
  // //实例化树
  // InitDataTree(setting, data) {
  //   //$.fn.zTree.init($("#treeDemo"), setting, data);
  // }
  // //系统列表
  // loadSystem() {
  //   var self = this;
  //   this.sysService.findSystem({}).subscribe(result => {
  //     if (result != null) {
  //       // console.log(result.data)
  //       this.roleNodes = [];
  //       this.exampleData = [{ id: 'system_-1', text: '默认类别' }];
  //       _.each(result.data, (item) => {
  //         item.Systemid = 'system_' + item.Systemid;
  //         item.Systempid = 'system_' + item.Systempid;
  //         this.roleNodes.push({ id: item.Systemid, pId: item.Systempid, name: item.Systemname, isParent: true });
  //       });
  //       this.InitDataTree(this.TreeSetting, this.roleNodes);
  //       let selectTree = this.recursionData(this.roleNodes, 'system_-1');
  //       // console.log(selectTree)
  //       _.each(selectTree, (item) => {
  //         if (item.lev == 0) {
  //           this.exampleData.push({ id: item.id, text: item.name });
  //         } else if (item.lev == 1) {
  //           this.exampleData.push({ id: item.id, text: '　' + item.name });
  //         } else if (item.lev == 2) {
  //           this.exampleData.push({ id: item.id, text: '　　' + item.name });
  //         }
  //       })
  //     }
  //   });

  // }
  // //系统详情
  // loadSystemDetail(e) {
  //   this.sysService.getSystem({ Systemid: this.ID(e.id) }).subscribe(result => {
  //     if (result != null) {
  //       this.systemItemData = result.data;
  //       console.log("---------1--1--1")
  //       //绑定下拉框--
  //       // this.systemItemData.
  //       // _.each()
  //       // $('#select1').val(arr).trigger('change');
  //     }
  //   });
  // }
  // //模块列表
  // loadModule(e) {
  //   this.sysService.findmodule({ Systemid: this.ID(e.id) }).subscribe(result => {
  //     if (result != null) {
  //       _.each(result.data, (item) => {
  //         item.Moduleid = 'module_' + item.Moduleid;
  //         item.Systemid = 'system_' + item.Systemid;
  //         this.roleNodes.push({ id: item.Moduleid, pId: item.Systemid, name: item.Modulename });
  //       });
  //       this.roleNodes = _.uniq(this.roleNodes, 'id');
  //       //展开当前节点
  //       _.each(this.roleNodes, function (obj) {
  //         if (obj.id == e.id) {
  //           obj.open = true;
  //         }
  //       })
  //       this.InitDataTree(this.TreeSetting, this.roleNodes);
  //     }
  //   });
  // }
  // //模块详情
  // loadModuleDetail(e) {
  //   this.sysService.getmodule({ Moduleid: this.ID(e.id) }).subscribe(result => {
  //     if (result != null) {
  //       this.moduleData = result.data;
  //     }
  //   });
  // }
  // //保存
  // okClick(t) {
  //   let menuList = {};
  //   this.typeItemBox = 0;
  //   if (t == 'systemBj') {
  //     //转化字段
  //     this.systemItemData.Systemstate = parseInt(this.systemItemData.Systemstate)
  //     if(this.systemItemData.Systempid != null){
  //       this.systemItemData.Systempid = parseInt(this.systemItemData.Systempid)
  //     }
  //     this.sysService.upSystem(this.systemItemData).subscribe(result => {
  //       if (result != null) {
  //         this.alert("修改成功", "success");
  //         this.loadSystem();
  //       }
  //     });
  //   } else if (t == 'systemItemTj') {
  //     this.systemItemData.Systemstate = parseInt(this.systemItemData.Systemstate)
  //     if(this.systemItemData.Systempid != null){
  //       this.systemItemData.Systempid = parseInt(this.systemItemData.Systempid)
  //     }
  //     this.sysService.inSystem(this.systemItemData).subscribe(result => {
  //       if (result != null) {
  //         this.alert("添加成功", "success");
  //         this.loadSystem();
  //       }
  //     });
  //   } else if (t == 'moduleBj') {
  //     this.sysService.upModule(this.moduleData).subscribe(result => {
  //       if (result != null) {
  //         this.alert("修改成功", "success");
  //         this.loadSystem();
  //       }
  //     });
  //   } else if (t == 'moduleTj') {
  //     this.sysService.inModule(this.moduleData).subscribe(result => {
  //       if (result != null) {
  //         this.alert("添加成功", "success");
  //         this.loadSystem();
  //       }
  //     });
  //   }
  //   setTimeout(() => {
  //     this.notifyMenuChanged();
  //   }, 100);

  // }
  // //添加
  // addClick(n) {
  //   if (n != 1) {
  //     this.moduleData = {};
  //     this.okType = 'moduleTj';
  //     this.startValue = '';
  //     this.moduleData.Modulestate = '1';
  //   } else {
  //     this.systemItemData = {};
  //     this.okType = 'systemItemTj';
  //     this.startValue = '';
  //     this.systemItemData.Systemstate = '1';
  //   }
  //   this.typeItemBox = n;
  // }
  // //删除
  // deleteClick(t) {
  //   var self = this;
  //   if (t == 'systemDelete') {
  //     // swal({
  //     //   title: '你确定要删除吗?',
  //     //   text: '删除后文件将无法恢复!',
  //     //   type: 'warning',
  //     //   showCancelButton: true,
  //     //   allowOutsideClick: false,
  //     //   confirmButtonText: '确定',
  //     //   cancelButtonText: '取消'
  //     // }).then(function () {
  //     //   let ID = {
  //     //     Systemid: self.systemItemData.Systemid
  //     //   }
  //     //   self.sysService.delSystem(ID).subscribe(result => {
  //     //     if (result != null) {
  //     //       self.loadSystem();
  //     //       self.typeItemBox = 0;
  //     //       swal(
  //     //         '删除!',
  //     //         '你的文件已经被删除',
  //     //         'success'
  //     //       );
  //     //       self.notifyMenuChanged();
  //     //     }
  //     //   });
  //     // }, function (dismiss) { });
  //   } else if (t == 'moduleDelete') {
  //     // swal({
  //     //   title: '你确定要删除吗?',
  //     //   text: '删除后文件将无法恢复!',
  //     //   type: 'warning',
  //     //   showCancelButton: true,
  //     //   allowOutsideClick: false,
  //     //   confirmButtonText: '确定',
  //     //   cancelButtonText: '取消'
  //     // }).then(function () {
  //     //   let ID = {
  //     //     Moduleid: self.moduleData.Moduleid
  //     //   }
  //     //   self.sysService.delModule(ID).subscribe(result => {
  //     //     if (result != null) {
  //     //       self.loadSystem();
  //     //       self.typeItemBox = 0;
  //     //       swal(
  //     //         '删除!',
  //     //         '你的文件已经被删除',
  //     //         'success'
  //     //       );
  //     //       self.notifyMenuChanged();
  //     //     }
  //     //   });
  //     // }, function (dismiss) { });
  //   }
  // }
  // //下拉框事件
  // changed(e, t) {
  //   let id = this.ID(e.value);
  //   if (t == 'systemItem') {
  //     this.systemItemData.Systempid = id.toString();
  //   } else if (t == 'module') {
  //     this.moduleData.Systemid = id.toString();
  //   }
  // }
  // //检测菜单变化
  // notifyMenuChanged() {
  //   let menuList = {};
  //   this.sysService.menuList({}).subscribe(result => {
  //     menuList = result.data;
  //     this._state.notifyDataChanged('menuData', menuList);
  //   })
  // }
  // //取整数ID
  // ID(d) {
  //   return Number(d.substring(d.lastIndexOf('_') + 1));
  // }
  // //递归数据处理
  // recursionData(arr, id) {
  //   var temp = [], lev = 0;
  //   var forFn = function (arr, id, lev) {
  //     for (var i = 0; i < arr.length; i++) {
  //       var item = arr[i];
  //       if (item.pId == id) {
  //         item.lev = lev;
  //         temp.push(item);
  //         forFn(arr, item.id, lev + 1);
  //       }
  //     }
  //   };
  //   forFn(arr, id, lev);
  //   return temp;
  // }
  // //提示信息
  // alert(info, type) {
  //   this._state.notifyDataChanged('Toast.Action.Show', { content: info, type: type });
  // }

}
