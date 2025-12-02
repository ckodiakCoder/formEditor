import { Component } from '@angular/core';
import { Editor } from './components/editor/editor';
import { Preview } from './components/preview/preview';
import { FlowJsonPreview } from './components/flow-json-preview/flow-json-preview';
import { ContentField } from './models/content-field';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Editor, Preview, FlowJsonPreview],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  activePage = { name: 'Page 1' };
  currentButtonName = 'Continue';
  contentFields: ContentField[] = [];

  pages: Array<{
    id: number;
    name: string;
    buttonName: string;
    contentFields: ContentField[];
  }> = [];

  flowJson = '';

  onPagesChange(pages: any[]) {
    this.pages = pages;
    this.flowJson = JSON.stringify(
      {
        pages: pages.map((p) => ({
          id: p.id,
          name: p.name,
          buttonName: p.buttonName,
          contentFields: p.contentFields,
        })),
      },
      null,
      2
    );
  }
}
