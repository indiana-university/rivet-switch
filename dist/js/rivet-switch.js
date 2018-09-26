/*!
 * rivet-switch - @version 0.2.0
 *
 * Licensed under the BSD 3-Clause License.

 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:

 *  1.Redistributions of source code must retain the above copyright notice,
 *  this list of conditions and the following disclaimer.
 *  2.Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation
 *  and/or other materials provided with the distribution.
 *  3.Neither the name of the copyright holder nor the names of its
 *  contributors may be used to endorse or promote products derived from
 *  this software without specific prior written permission.

 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
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