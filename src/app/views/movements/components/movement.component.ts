import { Component, Input } from '@angular/core';

@Component({
  selector: 'movement',
  templateUrl: './movement.component.html'
})
export class MovementComponent {

  @Input() date: string | null = null;
  @Input() amount: number | undefined = undefined;
  @Input() type: 'in' | 'out' | undefined= undefined;
  @Input() title: string | undefined = undefined;
  @Input() description: string | undefined = undefined;

  panelOpenState = false;
}
