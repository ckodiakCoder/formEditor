import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-flow-json-preview',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './flow-json-preview.html',
  styleUrl: './flow-json-preview.css',
})
export class FlowJsonPreview {
  @Input() flowJson: string = '';

  copyJson() {
    if (!this.flowJson) return;
    navigator.clipboard.writeText(this.flowJson).then(
      () => {
        console.log('Flow JSON copied to clipboard');
      },
      (err) => {
        console.error('Failed to copy JSON', err);
      }
    );
  }
}
