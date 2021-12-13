import { ThemeHandlerService } from 'src/app/shared/utils-services/theme-handler.service';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'background-toolbar-animation',
  template: `
  <div [ngClass]="isDarkThemeMode ? 'box-toolbar-dark' : 'box-toolbar-light'">
            <div></div>
            <div></div>  
            <div></div>
            <div></div>
            <div></div>
  </div>
`,
  styleUrls: ['./background-toolbar-animation.component.scss']
})
export class BackgrounToolbarAnimationComponent{

  @Input()isDarkThemeMode: boolean = false;

}
