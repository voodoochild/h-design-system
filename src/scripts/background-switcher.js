;(() => {
  'use strict';

  class BackgroundSwitcher {
    constructor () {
      const colours = ['#ffffff', '#f3f3f3', '#f9f5ee'];

      this.$controls = $('<ul id="background-switcher"></ul>');

      colours.forEach(colour => {
        this.$controls.append(`<li style="background-color: ${colour}"></li>`);
      });

      this.$controls.find('li:first-of-type').addClass('active');

      this.$controls.on('click', 'li', e => {
        let $target = $(e.target);
        $('body').css('background-color', $target.css('background-color'));
        this.$controls.find('li').removeClass('active');
        $target.addClass('active');
      });

      $('body').append(this.$controls);
    }
  }

  new BackgroundSwitcher();
})();
