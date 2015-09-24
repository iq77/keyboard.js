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


function KeyboardHandler(name, callback, event){
    // event: "keydown" (default), "keyup" or "both"
    this.name = name;
    this.callback = callback;
    this.event = (event==null) ? 'keydown' : event;
};


function Keyboard(lang) {
    if (lang==null)
        lang = 'standard';
    if (typeof this.codes[lang] != 'undefined'){
        var keyboard = this;
        this.keyTable = this.codes[lang];
        this.keyUpHandler = null;
        this.keyDownHandler = null;
        this.pressed = {};
        this.customHandlers = {};
        this.keyTable.forEach(function(keyName){
            if (keyName != null){
                keyboard.pressed[keyName] = false;
                keyboard.customHandlers[keyName] = [];
            }
        });
    }
    else
        console.log('key table unknown');
};


Keyboard.prototype.start = function(){
    var keyboard = this;
    // event listeners
    this.keyDownHandler = document.addEventListener("keydown", function(e){
        var keyName = keyboard.keyTable[e.keyCode];
        if (keyName != null){
            keyboard.pressed[keyName] = true;
            keyboard.customHandlers[keyName].forEach(function(handler){
                if (handler.event != 'keyup'){
                    handler.callback();
                    e.preventDefault();
                    e.stopPropagation();
                }
            });
        }
    });
    this.keyUpHandler = document.addEventListener("keyup", function(e){
        var keyName = keyboard.keyTable[e.keyCode];
        if (keyName != null){
            keyboard.pressed[keyName] = false;
            keyboard.customHandlers[keyName].forEach(function(handler){
                if (handler.event != 'keydown'){
                    handler.callback();
                    e.preventDefault();
                    e.stopPropagation();
                }
            });
        }
    });
};

Keyboard.prototype.addHandler = function(keyName, handlerName, callback){
    // return false (none added), 1 (added) or 2 (replaced)
    var added = false;
    if (typeof this.customHandlers[keyName] != 'undefined'){
        var newHandler = new KeyboardHandler(handlerName, callback);
        this.customHandlers[keyName].forEach(function(handler){
            if (handler.name==handlerName){
                handler = newHandler;
                added = 2;
            }
        });
        if (!added){
            this.customHandlers[keyName].push(newHandler);
            added = 1;
        }
    }
    return added;
};

Keyboard.prototype.removeHandler = function(keyName, handlerName){
    // return true (handler removed) or false
    var removed = false;
    if (typeof this.customHandlers[keyName] != 'undefined'){
        for (var i=0; i<this.customHandlers[keyName].length; i++){
            if (this.customHandlers[keyName][i].name==handlerName){
                this.customHandlers[keyName].splice(i, 1);
                removed = true;
                break;
            }
        }
    }
    return removed;
};

Keyboard.prototype.stop = function(){
    if (this.keyDownHandler){
        this.keyDownHandler.remove();
        this.keyDownHandler = null;
    }
    if (this.keyUpHandler){
        this.keyUpHandler.remove();
        this.keyUpHandler = null;
    }
};

Keyboard.prototype.codes = {
    standard : [ // default keys with CamelCase, keypad numbers and numberpad numbers are treated the same if numlock is on
        /*   0 */ null, null, null, null, null, null, null, null, 'BackSpace', 'Tab',
        /*  10 */ null, null, null, 'Enter', null, null, 'Shift', 'Ctrl', 'Alt', 'Pause',
        /*  20 */ 'CapsLock', null, null, null, null, null, null, 'Esc', null, null,
        /*  30 */ null, null, 'Space', 'PageUp', 'PageDown', 'End', 'Home', 'ArrowLeft', 'ArrowUp', 'ArrowRight',
        /*  40 */ 'ArrowDown', null, null, null, 'PrntScrn', 'Insert', 'Delete', null, '0', '1',
        /*  50 */ '2', '3', '4', '5', '6', '7', '8', '9', null, null,
        /*  60 */ null, null, null, null, null, 'A', 'B', 'C', 'D', 'E',
        /*  70 */ 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O',
        /*  80 */ 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y',
        /*  90 */ 'Z', 'SysStart', 'SysMenu', null, null, null, '0', '1', '2', '3',
        /* 100 */ '4', '5', '6', '7', '8', '9', null, null, null, null,
        /* 110 */ null, null, 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8',
        /* 120 */ 'F9', 'F10', 'F11', 'F12', null, null, null, null, null, null,
        /* 130 */ null, null, null, null, null, null, null, null, null, null,
        /* 140 */ null, null, null, null, 'NumLock', 'ScrollLock', null, null, null, null,
        /* 150 */ null, null, null, null, null, null, null, null, null, null,
        /* 160 */ null, null, null, null, null, null, null, null, null, null,
        /* 170 */ null, null, null, null, null, null, null, null, null, null,
        /* 180 */ null, null, null, null, null, null, null, null, null, null,
        /* 190 */ null, null, null, null, null, null, null, null, null, null,
        /* 200 */ null, null, null, null, null, null, null, null, null, null,
        /* 210 */ null, null, null, null, null, null, null, null, null, null,
        /* 220 */ null, null, null, null, null, null, null, null, null, null,
        /* 230 */ null, null, null, null, null, null, null, null, null, null
    ]
};

