export interface ContentField {
  type: 'input' | 'textarea' | 'datepicker' | 'dropdown' | 'checkbox';
  label: string;
  required: boolean;
  options?: string[];      
  defaultOption?: string;  
}
