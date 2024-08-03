import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationByIdComponent } from './consultation-by-id.component';

describe('ConsultationByIdComponent', () => {
  let component: ConsultationByIdComponent;
  let fixture: ComponentFixture<ConsultationByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultationByIdComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConsultationByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
