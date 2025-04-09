import { Component, Input, Output, EventEmitter } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-homecontent',
  imports: [MatCardModule, MatButtonModule, RouterModule],
  templateUrl: './homecontent.component.html',
  styleUrl: './homecontent.component.css'
})
export class HomecontentComponent {
  @Input() parentMessage: string = ''; // Input from parent
  @Output() messageToParent = new EventEmitter<string>(); // Output to parent

  childMessage: string = '';

  sendMessageToParent() {
    this.messageToParent.emit(this.childMessage);
    this.childMessage = 'meow';
  }
  literallybraindeadbutton() {
    this.sendMessageToParent();
    console.log(this.childMessage);
  }
}
