import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThmBadgeComponent } from './thm-badge.component';

describe('ThmBadgeComponent', () => {
  let component: ThmBadgeComponent;
  let fixture: ComponentFixture<ThmBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThmBadgeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThmBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
