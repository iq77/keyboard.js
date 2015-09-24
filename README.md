# keyboard.js
JavaScript keyboard driver

Under Construction :)

/*
 * synchronous use (poll for pressed keys in your code):
 *
 * var k = new Keyboard('standard');
 * [code...]
 * if (k.pressed.ESC)
 *    // then ESC is currently pressed
 *
 *
 * asynchronous use (call back whenever a key is being pressed):
 *
 * var k = new Keyboard('standard');
 * k.addHandler('ESC', 'esc-handler-1', function(){your code});
 * k.addHandler('ESC', 'esc-handler-1', function(){your code}); // overwrite previous...
 * k.removeHandler('ESC', 'esc-handler-1'); // remove previous
 *
 *
 *
 * check...
 * - PrntScrn -> keyup only in most browsers?
 *
 */
