import {
  Component,
  ViewChild,
  ComponentFactoryResolver,
  ViewContainerRef,
  AfterViewInit,
  OnInit,
  OnDestroy,
  ElementRef,
  Renderer2,
  Inject,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import {
  Router,
  NavigationEnd,
  RouteConfigLoadStart,
  NavigationError,
  NavigationCancel,
} from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { Subject } from 'rxjs';
import { updateHostClass } from '@delon/util';
import { ScrollService, MenuService, SettingsService } from '@delon/theme';
import { CacheService } from '@delon/cache'
import { environment } from '@env/environment';
import { SettingDrawerComponent } from './setting-drawer/setting-drawer.component';
import { takeUntil } from 'rxjs/operators';
import { defaultServices} from '../services/defaultService'
import { comservices } from '../../shared/services'
import { GlobalState } from './../../core/common'
@Component({
  selector: 'layout-default',
  templateUrl: './default.component.html',
  host: {
    '[class.alain-default]': 'true',
  },
})
export class LayoutDefaultComponent implements OnInit, AfterViewInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  @ViewChild('settingHost', { read: ViewContainerRef })
  private settingHost: ViewContainerRef;
  isFetching = false;
  UserObject:any = {}
  constructor(
    private router: Router,
    scroll: ScrollService,
    private _message: NzMessageService,
    private resolver: ComponentFactoryResolver,
    public menuSrv: MenuService,
    public settings: SettingsService,
    private el: ElementRef,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private doc: any,
    private defaultServices:defaultServices,
    private cacheService:CacheService,
    private comservices:comservices,
    private _state:GlobalState,
  ) {
    // scroll to top in change page
    this.router.events.pipe(takeUntil(this.unsubscribe$)).subscribe(evt => {
      if (!this.isFetching && evt instanceof RouteConfigLoadStart) {
        this.isFetching = true;
      }
      if (evt instanceof NavigationError || evt instanceof NavigationCancel) {
        this.isFetching = false;
        if (evt instanceof NavigationError) {
          this._message.error(`无法加载${evt.url}路由`, { nzDuration: 1000 * 3 });
        }
        return;
      }
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      setTimeout(() => {
        scroll.scrollToTop();
        this.isFetching = false;
      }, 100);
    });

    //消息重新加载
    this._state.subscribe('USERDATA.RELOAD', (data) => {
      //this.loadMenu();
      // this.loadUser();       
    });
  }

  private setClass() {
    const { el, renderer, settings } = this;
    const layout = settings.layout;
    updateHostClass(
      el.nativeElement,
      renderer,
      {
        ['alain-default']: true,
        [`alain-default__fixed`]: layout.fixed,
        [`alain-default__boxed`]: layout.boxed,
        [`alain-default__collapsed`]: layout.collapsed,
      },
      true,
    );

    this.doc.body.classList[layout.colorWeak ? 'add' : 'remove']('color-weak');
  }

  ngAfterViewInit(): void {
    var self = this;
    // Setting componet for only developer
    try{
      if (!environment.production) {
        setTimeout(() => {
          const settingFactory = self.resolver.resolveComponentFactory(
            SettingDrawerComponent,
          );
          try{
            self.settingHost.createComponent(settingFactory);
          }catch(e){

          }
        }, 22);
      }
    }catch(ex){

    }
    

    this.loadMenu()
    //设置用户信息
  }

  ngOnInit() {
    const { settings, unsubscribe$ } = this;
    settings.notify.pipe(takeUntil(unsubscribe$)).subscribe(() => this.setClass());
    this.setClass();
  }

  ngOnDestroy() {
    const { unsubscribe$ } = this;
    unsubscribe$.next();
    unsubscribe$.complete();
  }

  loadMenu(){
    var self = this;
    this.UserObject = this.cacheService.getNone(WebConfig.UserObjectCookie.name)
    if(!this.UserObject){
      this._message.error("未找到用户信息")
      this.router.navigateByUrl('/login')
    }else{
      var postData = {
        leveltype:this.UserObject.leveltype,
        usercode:this.UserObject.keycode,
        enterpriseid:this.UserObject.enterprisecode
      }
      this.defaultServices.loadMenu(postData).subscribe(result => {
        if(result){
          var menuList = [];
          menuList.push(result.data)
          self.menuSrv.add(menuList)
        }else{
          var menuList = [];
          self.menuSrv.add(menuList)
        }
      })
    }
  }
  
}
