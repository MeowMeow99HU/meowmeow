import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllplansearchComponent } from './allplansearch.component';

describe('AllplansearchComponent', () => {
  let component: AllplansearchComponent;
  let fixture: ComponentFixture<AllplansearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllplansearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllplansearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
