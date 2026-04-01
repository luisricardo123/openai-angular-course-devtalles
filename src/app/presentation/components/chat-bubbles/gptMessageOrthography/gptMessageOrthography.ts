import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-gpt-message-orthography',
  imports: [],
  templateUrl: './gptMessageOrthography.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GptMessageOrthography {
  userScore = input.required<number>();
  text = input.required<string>();
  errors = input<string[]>([]);
}
