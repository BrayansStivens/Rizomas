import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioFondoComponent } from './audio-fondo.component';

describe('AudioFondoComponent', () => {
  let component: AudioFondoComponent;
  let fixture: ComponentFixture<AudioFondoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AudioFondoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AudioFondoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
