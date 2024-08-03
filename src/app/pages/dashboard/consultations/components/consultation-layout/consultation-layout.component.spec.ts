import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationLayoutComponent } from './consultation-layout.component';

describe('ConsultationLayoutComponent', () => {
  let component: ConsultationLayoutComponent;
  let fixture: ComponentFixture<ConsultationLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultationLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConsultationLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
