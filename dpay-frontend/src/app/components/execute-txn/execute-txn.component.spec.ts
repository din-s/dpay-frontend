import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecuteTxnComponent } from './execute-txn.component';

describe('ExecuteTxnComponent', () => {
  let component: ExecuteTxnComponent;
  let fixture: ComponentFixture<ExecuteTxnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExecuteTxnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExecuteTxnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
