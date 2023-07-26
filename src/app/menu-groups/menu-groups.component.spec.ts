import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuGroupsComponent } from './menu-groups.component';

describe('MenuGroupsComponent', () => {
  let component: MenuGroupsComponent;
  let fixture: ComponentFixture<MenuGroupsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuGroupsComponent]
    });
    fixture = TestBed.createComponent(MenuGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
