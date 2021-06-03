import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroPowerComponent } from './hero-power.component';

describe('HeroPowerComponent', () => {
  let component: HeroPowerComponent;
  let fixture: ComponentFixture<HeroPowerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeroPowerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroPowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
