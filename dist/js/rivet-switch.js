/*!
 * rivet-switch - @version 0.1.1-alpha
 *
 * Copyright (c) 2018, The Trustees of Indiana University

 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], function () {
      return factory(root);
    });
  } else if (typeof exports === 'object') {
    module.exports = factory(root);
  } else {
    root.Switch = factory(root);
  }
})(typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : this, function (window) {

  'use strict';

  /**
   * Creates a new custom event and stores a reference
   * to the unique "data-switch" attribute in the custom
   * event's options "detail" property.
   *
   * More here:
   * https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events#Adding_custom_data_%E2%80%93_CustomEvent()
   *
   */
  var _fireCustomEvent = function(element, eventName) {
    var event = new CustomEvent(eventName, {
      bubbles: true,
      detail: {
        name: function() {
          return element.getAttribute('data-switch');
        }
      }
    });

    // Distpatch the event
    element.dispatchEvent(event);
  }

  // Switch On method
  var switchOn = function(switchButton, callback) {
    switchButton.setAttribute('aria-checked', 'true');

    _fireCustomEvent(switchButton, 'switchOn');

    if (callback && typeof callback === 'function') {
      callback();
    }
  }

  var switchOff = function(switchButton, callback) {
    switchButton.setAttribute('aria-checked', 'false');

    _fireCustomEvent(switchButton, 'switchOff');

    if (callback && typeof callback === 'function') {
      callback();
    }
  }

  var _handleClick = function(event) {
    // Capture the switch that was clicked
    var toggleButton = event.target.closest('[data-switch]');

    // If the click target wasn't a switch bail
    if (!toggleButton) return;

    // Get the switch's "checked" state e.g. "true" or "False"
    var switchState = toggleButton.getAttribute('aria-checked');

    // If the swithch is off, set the checked state to "true"
    if (switchState === 'false') {
      switchOn(toggleButton);
    } else {
      switchOff(toggleButton);
    }
  }

  var init = function() {
    document.addEventListener('click', _handleClick, false);
  }

  /**
   * Return public APIs
   */
  return {
    on: switchOn,
    off: switchOff,
    init: init
  }
});