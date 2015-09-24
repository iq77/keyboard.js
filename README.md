# synchronous use

```
var k = new Keyboard('standard');
if (k.pressed.ESC) ...
```



# asynchronous use

```
var k = new Keyboard('standard');
k.addHandler('ESC', 'esc-handler-1', function(){your code});
k.addHandler('ESC', 'esc-handler-1', function(){your code}); // overwrite previous...
k.removeHandler('ESC', 'esc-handler-1'); // remove previous
```



# check...

PrntScrn -> keyup only in most browsers?
