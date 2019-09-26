# rivet-switch
An accessible switch component for Rivet

[Download Rivet switch](https://github.com/indiana-university/rivet-switch/archive/master.zip) | [View the demo](https://indiana-university.github.io/rivet-switch/)

## Notes about usage
Switch components are based on their real-life counterparts &#151; physical switches. Physical switches close or open a circuit to create states of "on" or "off", respectively. As a result, switch components should feature the text "On" and "Off", with any additional context being provided by a label.

Switches do not behave the same as checkboxes. Checkboxes are generally used in the context of a form and separate the act of selection from the execution of the chosen selection. Switches are typically standalone components which combine selection and execution into a single step. For these reasons, switches should not be used within a form.

For more information please see [Checkbox vs Toggle Switch](https://uxplanet.org/checkbox-vs-toggle-switch-7fc6e83f10b8) on [Medium](https://medium.com/).

## Getting started
The Rivet switch add-on requires the use of the core Rivet CSS. You can find out more about how to get started in [the Rivet documentation](https://rivet.iu.edu/components/). Once you are using Rivet, you can download the Rivet switch source files and include them in your project.

### Note: `closest()` polyfill
The Rivet Switch uses the `.closest()` JavaScript method which works in all modern web browsers, but requires a small polyfill to add support for Internet Explorer 11. The main Rivet JavaScript file (`rivet.js`) already includes the `closest()` polyfill so if you are using it on your page there is no need to add it.

```js
/**
 * Element.closest() polyfill
 * https://developer.mozilla.org/en-US/docs/Web/API/Element/closest#Polyfill
 */
if (!Element.prototype.closest) {
  if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
  }

  Element.prototype.closest = function (s) {
    var el = this;
    var ancestor = this;
    if (!document.documentElement.contains(el)) return null;
    do {
      if (ancestor.matches(s)) return ancestor;
      ancestor = ancestor.parentElement;
    } while (ancestor !== null);
    return null;
  };
}
```

### 1. Include the CCS and JavaScript in your page
```html
<link rel="stylesheet" href="dist/css/rivet-switch.min.css">
<script src="dist/js/rivet-switch.min.js"></script>
```

### 2. Add the markup to your HTML
The Rivet switch markup uses a HTML `<button>` element. To use the switch add the following markup to your page.

```html
<button class="rvt-switch" data-switch="email-switch" role="switch" aria-checked="false">
  <span class="rvt-switch__on">On</span>
  <span class="rvt-switch__off">Off</span>
</button>
```

### 3. Initialize the add-on
Lastly, you'll need to initialize somewhere right before the closing `</body>` tag of you page.

```html
<script>
  Switch.init();
</script>
```

## JavaScript API
The Rivet switch component exposes a handful of methods you can use to programmatically control the component. The `.init()` method must be called somewhere in your document after the `rivet-switch.js` script is included. The `init()` method attaches and event listener to the document that listens for clicks on buttons with the `data-switch` attribute. With that in mind you should be able to dynamically add switches to the DOM without having the re-initialize the component.

### Methods

| Method| Description|
|--------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `Switch.init()` | Initializes the switch component |
| `Switch.on(button, callback)` | Accepts a switch button element `[data-switch]` and an optional callback function that is run after the switch is toggled on. |
| `Switch.off(button, callback)` | Accepts a switch button element `[data-switch]` and an optional callback function that is run after the switch is toggled off. |

### Custom events
The switch component emmits custom events when it is toggled on or off. You can listen for these events in your own scripts and respond to them as needed.

|Event|Description|
|----|------|
|`switchOn`|Emitted when the switch is toggled on via the `Switch.on()` method. The value of the switch `data-switch` attibute is also passed along via the custom event's `detail` property and is available to use in your scripts as `event.detail.name()`|
|`switchOff`|Emitted when the switch is toggled on via the `Switch.off()` method. The value of the switch `data-switch` attibute is also passed along via the custom event's `detail` property and is available to use in your scripts as `event.detail.name()`|

#### Custom event example
```js
// Listen for a custom "switchOn" event
document.addEventListener('switchOn', event => {
  if (event.detail.name() == 'email-switch') {
    alert('Okay, we\'ll send you some emails!')
  }
  // Maybe send some data via an AJAX request, etc...
}, false);
```

## Working with source files
1. To work with the switch source files first clone or download this repo: `https://github.com/indiana-university/rivet-switch.git`
1. Install the dependencies using NPM: `npm install`
1. Start the development server by running `npm start` in your terminal. The demo will open in a new browser window at `http://localhost:3000` and the server will watch for changes to all `.scss` and `.js` files.
