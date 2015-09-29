;(() => {
  'use strict';

  class Colours {
    constructor (root = document.getElementById('colours')) {
      this.root = root;

      // Calculate the hex code for each swatch
      let swatches = Array.from(this.root.querySelectorAll('.colour-swatch'));
      swatches.map((swatch) => {
        let $circle = $(swatch.querySelector('b'));
        let $label = $(swatch.querySelector('.colour-name'));
        let hex = this.rgb2hex($circle.css('background-color'));
        $label.after(`<input class="colour-hex" value="${hex}" readonly />`);
      });

      // Select hex code on click
      $(this.root).on('click', 'input', (e) => e.target.select());
    }

    rgb2hex (rgb) {
      function hex (x) {
        return ('0' + parseInt(x, 10).toString(16)).slice(-2);
      }
      rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
      return '#' + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
    }
  }

  new Colours();
})();
