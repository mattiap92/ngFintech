import { Component, Input } from '@angular/core';

@Component({
  selector: 'background-login-animation',
  template: `
  <div [ngClass]="isDarkThemeMode ? 'box-dark' : 'box-light'">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
  </div>
`,
styleUrls: ['./background-login-animation.component.scss']
})
export class BackgroundLoginAnimationComponent {

  @Input()isDarkThemeMode: boolean = false;

}
