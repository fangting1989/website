import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnumvalueEditComponent } from './enumvalue-edit.component';

describe('EnumvalueEditComponent', () => {
  let component: EnumvalueEditComponent;
  let fixture: ComponentFixture<EnumvalueEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnumvalueEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnumvalueEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
