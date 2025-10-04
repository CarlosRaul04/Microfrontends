import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Paramedic } from './paramedic';

describe('Paramedic', () => {
  let component: Paramedic;
  let fixture: ComponentFixture<Paramedic>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Paramedic],
    }).compileComponents();

    fixture = TestBed.createComponent(Paramedic);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
