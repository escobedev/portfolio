import { Component } from '@angular/core';
import { TypingTextComponent } from "../../layout/typing-text/typing-text.component";

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [TypingTextComponent],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss'
})
export class NotFoundComponent {

}
