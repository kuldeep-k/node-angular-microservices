import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDetailsListComponent } from './order-details-list.component';

describe('OrderDetailsListComponent', () => {
  let component: OrderDetailsListComponent;
  let fixture: ComponentFixture<OrderDetailsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderDetailsListComponent]
    });
    fixture = TestBed.createComponent(OrderDetailsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
