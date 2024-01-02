import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductQuantityCartComponent } from './product-quantity-cart.component';

describe('ProductQuantityCartComponent', () => {
  let component: ProductQuantityCartComponent;
  let fixture: ComponentFixture<ProductQuantityCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductQuantityCartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductQuantityCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
