import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusplanscontentComponent } from './busplanscontent.component';

describe('BusplanscontentComponent', () => {
  let component: BusplanscontentComponent;
  let fixture: ComponentFixture<BusplanscontentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusplanscontentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusplanscontentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
