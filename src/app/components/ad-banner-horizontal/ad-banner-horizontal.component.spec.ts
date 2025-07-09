import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdBannerHorizontalComponent } from './ad-banner-horizontal.component';

describe('AdBannerHorizontalComponent', () => {
  let component: AdBannerHorizontalComponent;
  let fixture: ComponentFixture<AdBannerHorizontalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdBannerHorizontalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdBannerHorizontalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
