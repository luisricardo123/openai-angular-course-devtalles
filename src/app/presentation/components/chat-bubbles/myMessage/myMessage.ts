import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-my-message',
  imports: [],
  templateUrl: './myMessage.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyMessage {
  text = input.required<string>();
}
