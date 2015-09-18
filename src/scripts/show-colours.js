;(() => {
  'use strict';

  class Colours {
    constructor(root = document.getElementById('colours')) {
      this.root = root;

      // Calculate the hex code for each swatch
      let swatches = Array.from(this.root.querySelectorAll('.colour-swatch'));
      swatches.map((swatch) => {
        let $circle = $(swatch.querySelector('b'));
        let $label = $(swatch.querySelector('.colour-name'));
        $label.data('hex', this.rgb2hex($circle.css('background-color')) || '');
        $label.data('name', $label.text() || '');
      });

      // Bind hover events
      $(this.root).on('mouseover mouseout', '.colour-swatch b', (e) => {
        this.toggleText($(e.target).next());
      });
    }

    rgb2hex (rgb) {
      function hex (x) {
        return ('0' + parseInt(x, 10).toString(16)).slice(-2);
      }
      rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
      return '#' + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
    }

    toggleText (label) {
      let $label = $(label);
      let name = $label.data('name');
      let hex = $label.data('hex');
      if ($label.text() === name) {
        $label.text(hex);
      } else {
        $label.text(name);
      }
    }
  }

  new Colours();
})();
