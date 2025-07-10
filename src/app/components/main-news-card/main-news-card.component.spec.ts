import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainNewsCardComponent } from './main-news-card.component';

describe('MainNewsCardComponent', () => {
  let component: MainNewsCardComponent;
  let fixture: ComponentFixture<MainNewsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainNewsCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainNewsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
