import { Component, Input } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { Code } from '../../models/code';
import { CodeTextComponent } from "../code-text/code-text.component";

@Component({
    selector: 'app-code-tabs',
    imports: [
        MatTabsModule,
        CodeTextComponent
    ],
    templateUrl: './code-tabs.component.html',
    styleUrl: './code-tabs.component.scss'
})
export class CodeTabsComponent {
  @Input() codes: Code[] = [];
}
