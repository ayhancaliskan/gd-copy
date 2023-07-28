import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChauffeursComponent } from './chauffeurs.component';

describe('ChauffeursComponent', () => {
  let component: ChauffeursComponent;
  let fixture: ComponentFixture<ChauffeursComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChauffeursComponent]
    });
    fixture = TestBed.createComponent(ChauffeursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
