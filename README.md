formEditor
A small Angular playground that lets you design simple WhatsApp‑style forms/screens on the left and see a live preview and generated flow JSON on the right.

The goal is to make it easy to experiment with screen layouts and components, and to see the JSON structure you could send to another system.

Features
Editor panel to:

Manage multiple “Screens” (pages) with their own fields and button text.

Add different component types: input, textarea, datepicker, dropdown, checkbox.

Configure labels, required flags, and dropdown options.

Live phone‑style preview of the currently selected screen.

Flow JSON panel that always shows the latest structure for all screens.

Clean PrimeNG‑based UI with simple controls and icons.

Tech stack
Angular 16+ (standalone components)

TypeScript

PrimeNG (inputs, selects, toggle, buttons, icons)

Reactive forms (FormGroup) for each screen

Basic CSS for layout and theming

Project structure (important folders/files)
src/app/app.component.*

Main layout: splits the page into:

Left editor panel

Middle preview phone canvas

Right JSON panel

Listens for events from the editor (pagesChange, selected page, fields, button name) and passes data down to Preview and FlowJsonPreview.

src/app/models/content-field.ts

Type definition for a single form field.

Describes:

type (input, textarea, datepicker, dropdown, checkbox)

label

required

Optional dropdown extra data (options, defaultOption).

src/app/components/editor/

editor.ts

Core logic for the editor.

Holds pages: each page has id, name, form (FormGroup), buttonName, and contentFields.

Handles:

Adding/removing/renaming screens.

Switching selected screen.

Adding/removing/updating content fields.

Updating dropdown options and default option.

Updating “Required” toggle.

Emitting:

Selected page info (setSelectedPage).

Current button name (buttonNameChange).

Current page fields (contentFieldsChange).

Full pages array (pagesChange) for the JSON panel.

Uses PrimeIcons constants for plus/trash icons.

editor.html

UI for the editor sidebar.

Sections:

“Screens”:

List of existing screens as cards.

“+ Add new” button that reveals a small inline form to add a new screen name.

“Edit content”:

Input to change the button name for the current screen.

“Add a component” row:

PrimeNG p-select to choose component type.

Plus icon button to add the new field.

List of content fields:

Shows type label, label input, Required toggle, delete icon.

For dropdown fields, shows “Default option” input and a list of options with remove icons and a “+ Add option” button.

editor.css

Styles the left panel.

Key ideas:

Fixed content width (around 420px) so rows align nicely.

Light card borders and hover states for screens and fields.

Left‑aligned layout so everything starts from the same column.

Scrollbar using .sidebar-scroll so long forms can be scrolled without breaking dropdown overlays.

src/app/components/preview/

preview.ts

Input component that receives:

Current page title.

Button label.

List of ContentField items.

Builds the view model for the form preview.

preview.html

Renders a phone‑like canvas.

Shows:

Header with current page name.

For each field:

Input/textarea/datepicker/dropdown styled as rounded inputs.

Checkbox with consistent text next to it.

Bottom button (same text as editor button name).

preview.css

Creates the “phone” look:

Fixed width/height, rounded corners, light shadow.

Scrollable middle content area.

Uses a professional system font stack for all text (inputs, labels, checkboxes) so the form looks consistent.

src/app/components/flow-json-preview/

flow-json-preview.ts

Input component that accepts flowJson: string.

Provides a “Copy JSON” button that copies the JSON to the clipboard.

flow-json-preview.html

Small card with header (“Flow JSON”) and a <pre> area showing the JSON.

flow-json-preview.css

Card styling similar to the preview.

Scrollable JSON body so long JSON stays inside the box.

How data flows
The editor owns the full list of screens (pages) and emits changes upward.

The root component:

Receives pagesChange from the editor.

Serializes this into JSON for the Flow JSON panel.

Passes the selected page’s fields and button text to the Preview component.

The Preview simply renders what it receives; it does not modify data.

The Flow JSON preview only displays and copies the JSON string.

Getting started
Install dependencies:

bash
npm install
Run the dev server:

bash
npm start
# or
ng serve
Open the app in your browser:

text
http://localhost:4200
Use the editor:

Add or rename screens in the “Screens” section.

Choose a component type in “Add a component” and click the plus icon.

Adjust labels, required toggles, and dropdown options.

Watch the phone preview and Flow JSON update live.
