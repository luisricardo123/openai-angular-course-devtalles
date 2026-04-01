import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

export interface Option {
  id: string;
  text: string;
}

export interface TextMessageBoxEvent {
  prompt: string;
  selectedOption: string;
}

@Component({
  selector: 'app-text-message-box-select',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './textMessageBoxSelect.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextMessageBoxSelect {
  placeholder = input<string>('');
  options = input.required<Option[]>();

  onMessage = output<TextMessageBoxEvent>();

  public fb = inject(FormBuilder);
  public form = this.fb.group({
    prompt: ['', Validators.required],
    selectedOption: ['', Validators.required],
  });

  handleSubmit() {
    if (this.form.invalid) return;

    const { prompt, selectedOption } = this.form.value;

    this.onMessage.emit({ prompt: prompt!, selectedOption: selectedOption! });
    this.form.reset();
  }
}
