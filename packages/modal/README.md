# @lovata/modal

## Installation

```sh
npm install @lovata/modal
```

## Initialization

### Javascript
```javascript
import Modal from '@lovata/modal';
```

### CSS
```css
@import '@lovata/modal/css/modal';
```

## HTML layout

```html
<div class="modal" id="{id}">
    <div class="modal__body">
        <button type="button" data-modal-close></button>
        ...
    </div>
</div>
```

Element with attribute `data-modal-close` click will close current modal.
Element with attribute `data-modal-open="{id}"` click will open modal with specified id:

```html
<button type="button" data-modal-open="{id}">...</button>
```

## CSS settings

Helper accepts some css custom properties

| Property | Default value |
| --- | --- |
| --modal__body--transition-timing-function | ease |
| --modal__body--transition-duration | 0.5s |

## Events

### showModal

Event `showModal` dispatch when modal open

### hideModal

Event `showModal` dispatch when modal hide

## Methods

### show(id)

Show modal

| Param | Type |
| --- | --- |
| id | <code>string</code> |

### hide({ hideOverlay })

Hide opened modal

| Param | Type | Description |
| --- | --- | --- |
| hideOverlay | <code>boolean</code> | Wheter to hide overlay. Default - `true` |

### activateFocusTrap()

Activate focus trap for active modal

### deactivateFocusTrap()

Deactivate focus trap for active modal