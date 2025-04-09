import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResplanscontentComponent } from './resplanscontent.component';

describe('ResplanscontentComponent', () => {
  let component: ResplanscontentComponent;
  let fixture: ComponentFixture<ResplanscontentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResplanscontentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResplanscontentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
