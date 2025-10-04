import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Attentions } from './attentions';

describe('Attentions', () => {
  let component: Attentions;
  let fixture: ComponentFixture<Attentions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Attentions],
    }).compileComponents();

    fixture = TestBed.createComponent(Attentions);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
