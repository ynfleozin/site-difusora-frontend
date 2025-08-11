import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoffeeQuoteComponent } from './coffee-quote.component';

describe('CoffeeQuoteComponent', () => {
  let component: CoffeeQuoteComponent;
  let fixture: ComponentFixture<CoffeeQuoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoffeeQuoteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoffeeQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
