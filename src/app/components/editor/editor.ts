import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputText } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { FormsModule } from '@angular/forms';
import { ContentField } from '../../models/content-field';
import { PrimeIcons } from 'primeng/api';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [
    CommonModule,
    InputText,
    SelectModule,
    ToggleSwitchModule,
    FormsModule,
  ],
  templateUrl: './editor.html',
  styleUrl: './editor.css',
})
export class Editor {
  // Each page carries its own buttonName and contentFields
  pages: Array<{
    id: number;
    name: string;
    form: FormGroup;
    buttonName: string;
    contentFields: ContentField[];
  }> = [
    {
      id: 1,
      name: 'Page 1',
      form: new FormGroup({}),
      buttonName: 'Continue',
      contentFields: [
        {
          type: 'input',
          label: 'Field Label',
          required: false,
        },
      ],
    },
  ];

  selectedPageIndex: number = 0;
  nextPageId = 2;

  // Add-new screen UI state
  isAddingPage = false;
  newPageName = '';

  // PrimeIcons constants
  readonly ICON_PLUS = PrimeIcons.PLUS;
  readonly ICON_TRASH = PrimeIcons.TRASH;

  // Convenience getters for current page’s state
  get currentPage() {
    return this.pages[this.selectedPageIndex];
  }

  get buttonName(): string {
    return this.currentPage.buttonName;
  }

  get contentFields(): ContentField[] {
    return this.currentPage.contentFields;
  }

  @Output() setSelectedPage = new EventEmitter<{
    id: number;
    name: string;
    form: FormGroup;
  }>();
  @Output() buttonNameChange = new EventEmitter<string>();
  @Output() contentFieldsChange = new EventEmitter<ContentField[]>();

  // emit full pages array for Flow JSON
  @Output() pagesChange = new EventEmitter<{
    id: number;
    name: string;
    form: FormGroup;
    buttonName: string;
    contentFields: ContentField[];
  }[]>();

  // --- Component Types ---
  componentTypes = [
    { label: 'Input Field', value: 'input' },
    { label: 'Textarea', value: 'textarea' },
    { label: 'Datepicker', value: 'datepicker' },
    { label: 'Dropdown', value: 'dropdown' },
    { label: 'Checkbox', value: 'checkbox' },
  ];
  selectedComponentType: ContentField['type'] = 'input';

  // Helper emitters
  emitFields() {
    this.contentFieldsChange.emit(this.currentPage.contentFields);
  }

  emitPages() {
    this.pagesChange.emit(this.pages);
  }

  // Add a new field to current page
  addContentField() {
    const base: ContentField = {
      type: this.selectedComponentType,
      label: 'Field Label',
      required: false,
    };

    if (this.selectedComponentType === 'dropdown') {
      base.options = ['Option 1', 'Option 2'];
      base.defaultOption = 'Option 1';
    }

    if (this.selectedComponentType === 'checkbox') {
      base.label = 'Checkbox Label';
    }

    this.currentPage.contentFields.push(base);
    this.emitFields();
    this.emitPages();
  }

  updateFieldLabel(index: number, label: string) {
    this.currentPage.contentFields[index].label = label;
    this.emitFields();
    this.emitPages();
  }

  updateFieldDefaultOption(index: number, value: string) {
    const field = this.currentPage.contentFields[index];
    if (field.type === 'dropdown') {
      field.defaultOption = value;
      this.emitFields();
      this.emitPages();
    }
  }

  updateDropdownOption(fieldIndex: number, optionIndex: number, value: string) {
    const field = this.currentPage.contentFields[fieldIndex];
    if (field.type === 'dropdown' && field.options) {
      field.options[optionIndex] = value;
      this.emitFields();
      this.emitPages();
    }
  }

  addDropdownOption(fieldIndex: number) {
    const field = this.currentPage.contentFields[fieldIndex];
    if (field.type === 'dropdown') {
      if (!field.options) {
        field.options = [];
      }
      field.options.push(`Option ${field.options.length + 1}`);
      if (!field.defaultOption && field.options.length > 0) {
        field.defaultOption = field.options[0];
      }
      this.emitFields();
      this.emitPages();
    }
  }

  removeDropdownOption(fieldIndex: number, optionIndex: number) {
    const field = this.currentPage.contentFields[fieldIndex];
    if (field.type === 'dropdown' && field.options) {
      field.options.splice(optionIndex, 1);
      if (field.defaultOption && !field.options.includes(field.defaultOption)) {
        field.defaultOption = field.options[0] || '';
      }
      this.emitFields();
      this.emitPages();
    }
  }

  updateFieldRequired(index: number, value: boolean) {
    this.currentPage.contentFields[index].required = value;
    this.emitFields();
    this.emitPages();
  }

  removeContentField(index: number) {
    this.currentPage.contentFields.splice(index, 1);
    this.emitFields();
    this.emitPages();
  }

  // For adding a new page
  addPage(name: string) {
    const trimmed = (name || '').trim();
    if (!trimmed) return;

    this.pages.push({
      id: this.nextPageId++,
      name: trimmed,
      form: new FormGroup({}),
      buttonName: 'Continue',
      contentFields: [
        {
          type: 'input',
          label: 'Field Label',
          required: false,
        },
      ],
    });
    this.isAddingPage = false;
    this.newPageName = '';
    this.selectPage(this.pages.length - 1);
    this.emitPages();
  }

  // for renaming a page (not used directly in UI now, but kept)
  renamePage(index: number, newName: string) {
    this.pages[index].name = newName;
    this.emitPages();
  }

  // selecting page index
  selectPage(index: number) {
    this.selectedPageIndex = index;
    const page = this.pages[index];
    this.setSelectedPage.emit({ id: page.id, name: page.name, form: page.form });
    this.buttonNameChange.emit(page.buttonName);
    this.contentFieldsChange.emit(page.contentFields);
  }

  // for removing a page
  removePage(index: number) {
    this.pages.splice(index, 1);
    if (this.pages.length === 0) {
      this.selectedPageIndex = -1;
      this.setSelectedPage.emit({
        id: 0,
        name: '',
        form: new FormGroup({}),
      });
      this.buttonNameChange.emit('Continue');
      this.contentFieldsChange.emit([]);
    } else {
      const newIndex = Math.max(
        0,
        Math.min(this.selectedPageIndex, this.pages.length - 1),
      );
      this.selectedPageIndex = newIndex;
      const page = this.pages[newIndex];
      this.setSelectedPage.emit({ id: page.id, name: page.name, form: page.form });
      this.buttonNameChange.emit(page.buttonName);
      this.contentFieldsChange.emit(page.contentFields);
    }
    this.emitPages();
  }

  onButtonNameChange(name: string) {
    this.currentPage.buttonName = name;
    this.buttonNameChange.emit(this.currentPage.buttonName);
    this.emitPages();
  }

  // ensure page data is pushed to App and able to preview
  ngOnInit() {
    const page = this.pages[0];
    this.setSelectedPage.emit({ id: page.id, name: page.name, form: page.form });
    this.buttonNameChange.emit(page.buttonName);
    this.contentFieldsChange.emit(page.contentFields);
    this.emitPages();
  }

  getComponentLabel(type: string): string {
    const found = this.componentTypes.find((c) => c.value === type);
    return found ? found.label : '';
  }
}
