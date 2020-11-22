function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var TARGET_PATH = "https://tvtools.shahid.net:{#PORT#}/target.js";
var STORAGE_KEY = "SHAHID_TV_TOOLS";
var SCRIPT_ID = "shahiddevtools";
var _keylog = [];
var _tempStorage = [];

function generateKey() {
  var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "{#PREFIX#}";
  var today = new Date();
  var dd = parseInt(String(today.getDate()).padStart(2, "0"));
  var mm = parseInt(String(today.getMonth() + 1).padStart(2, "0"));
  var yyyy = parseInt(today.getFullYear());
  var todayBase36 = (dd + mm + yyyy).toString(36);

  var digest = _toConsumableArray(todayBase36).map(function (char) {
    return char.charCodeAt(0);
  }).reduce(function (currentCode, prevCode) {
    return prevCode + currentCode;
  });

  return prefix + digest;
}

function storeItem(key, value) {
  if (window && window.localStorage) {
    localStorage.setItem(key, value);
  } else {
    _tempStorage[key] = value;
  }
}

function getItem(key) {
  if (window && window.localStorage) {
    return localStorage.getItem(key);
  } else {
    return _tempStorage[key];
  }
}

function attach() {
  var script = document.createElement("script");
  script.src = TARGET_PATH;
  script.id = SCRIPT_ID;
  document.head.appendChild(script);
  storeItem(STORAGE_KEY, true);
  console.log("script attached");
}

function detach() {
  var script = document.getElementById(SCRIPT_ID);
  if (script) {
    script.remove();
    storeItem(STORAGE_KEY, false);
  }
}

function shouldReatach() {
  var isFlagSet = getItem(STORAGE_KEY) === "true";
  var remoteConsoleScript = document.getElementById(SCRIPT_ID);
  return isFlagSet && !remoteConsoleScript;
}

function isAttached() {
  return document.getElementById(SCRIPT_ID) != null;
}

function validate() {
  var passCode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  var generatedKey = generateKey();
  return passCode.endsWith(generatedKey);
}

function listenToKeys() {
  document.addEventListener("keydown", function (event) {
    if (_keylog.length > 10) {
      _keylog.shift();
    }
    var key = event.key;
    if(!key && event.keyCode){
      key = String.fromCharCode(event.keyCode);
    }else if (!key && event.which){
      key = String.fromCharCode(event.which);
    }
    _keylog.push(key);

    if (validate(_keylog.join(""))) {
      console.log("is valid");
      if (isAttached()) {
        detach();
      } else {
        attach();
      }
      _keylog = [];
    }
  });
}

function init() {
  listenToKeys();

  if (shouldReatach()) {
    attach();
  }
}

init();