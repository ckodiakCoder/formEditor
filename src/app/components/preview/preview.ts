import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  selector: 'app-preview',
  standalone: true,
  imports: [
    ButtonModule,
    InputText,
    DatePickerModule,
    SelectModule,
    CheckboxModule,
    InputTextModule,
    FloatLabelModule,
    FormsModule,
  ],
  templateUrl: './preview.html',
  styleUrl: './preview.css',
})
export class Preview {
  @Input() pageName = '';
  @Input() buttonName = 'Continue';
  @Input() contentFields: any[] = [];

  // Helper to build dropdown options from string array
  getDropdownOptions(field: any) {
    const opts = field?.options || [];
    return opts.map((o: string) => ({ label: o, value: o }));
  }
}
