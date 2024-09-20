import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComingSoonDialogComponent } from './coming-soon-dialog.component';

describe('ComingSoonDialogComponent', () => {
  let component: ComingSoonDialogComponent;
  let fixture: ComponentFixture<ComingSoonDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComingSoonDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComingSoonDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
