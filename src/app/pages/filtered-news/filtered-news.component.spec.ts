import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilteredNewsComponent } from './filtered-news.component';

describe('FilteredNewsComponent', () => {
  let component: FilteredNewsComponent;
  let fixture: ComponentFixture<FilteredNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilteredNewsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilteredNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
