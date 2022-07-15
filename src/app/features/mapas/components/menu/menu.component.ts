import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'rizo-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  @Output() ventana: EventEmitter<string> = new EventEmitter<string>();
  constructor() {}

  ngOnInit(): void {}

  tabChange(event: any) {
    this.ventana.emit(event.tab.textLabel);
  }
}
