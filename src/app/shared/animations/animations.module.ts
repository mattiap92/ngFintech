import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackgrounToolbarAnimationComponent } from './background-toolbar-animations/background-toolbar-animation.component';
import { BackgroundLoginAnimationComponent } from './background-login-animations/background-login-animation.component';



@NgModule({
  declarations: [
    BackgroundLoginAnimationComponent,
    BackgrounToolbarAnimationComponent],
  imports: [CommonModule],
  exports: [
    BackgroundLoginAnimationComponent,
    BackgrounToolbarAnimationComponent
  ],
  providers: []
})
export class AnimationsModule {}
