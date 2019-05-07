import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModulemanagerComponent } from './modulemanager.component';

describe('ModulemanagerComponent', () => {
  let component: ModulemanagerComponent;
  let fixture: ComponentFixture<ModulemanagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModulemanagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModulemanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
