import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberPagesComponent } from './member-pages.component';

describe('MemberPagesComponent', () => {
  let component: MemberPagesComponent;
  let fixture: ComponentFixture<MemberPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberPagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
