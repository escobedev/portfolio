import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeTextComponent } from './code-text.component';

describe('CodeTextComponent', () => {
  let component: CodeTextComponent;
  let fixture: ComponentFixture<CodeTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodeTextComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodeTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
