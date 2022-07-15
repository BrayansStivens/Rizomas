import { Component, OnInit } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'rizo-audio-fondo',
  templateUrl: './audio-fondo.component.html',
  styleUrls: ['./audio-fondo.component.scss'],
})
export class AudioFondoComponent implements OnInit {
  soundUp: boolean = true;
  audio = new Audio('../../../../../assets/audio/forest.mp3');
  constructor(private menuComponent: MenuComponent) {}

  ngOnInit(): void {
    this.audio.autoplay = true;
    this.menuComponent.ventana.subscribe((response) => {
      if (response === 'mujeres') {
        this.soundUp = false;
        this.audio.pause();
      }
    });
  }

  sound(): void {
    if (this.soundUp) {
      this.soundUp = false;
      this.audio.pause();
    } else {
      this.soundUp = true;
      this.audio.play();
    }
  }
}
