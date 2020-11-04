var TARGET_PATH = "https://tvtools.shahid.net:{#PORT#}/target.js";
var STORAGE_KEY = "SHAHID_TV_TOOLS";
var SCRIPT_ID = "shahiddevtools";
var _keylog = [];
var _tempStorage = [];

// console.log("TV devtools installed");

function generateKey(prefix = "debug") {
    const today = new Date();
    const dd = parseInt(String(today.getDate()).padStart(2, "0"));
    const mm = parseInt(String(today.getMonth() + 1).padStart(2, "0"));
    const yyyy = parseInt(today.getFullYear());
    const todayBase36 = (dd + mm + yyyy).toString(36);
    const digest = [...todayBase36]
        .map((char) => char.charCodeAt(0))
        .reduce((currentCode, prevCode) => prevCode + currentCode);
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
    console.log("script attached")
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

function validate(passCode="") {
    var generatedKey = generateKey();
    // console.log(generatedKey, passCode, passCode.endsWith(generatedKey) )
    return passCode.endsWith(generatedKey);
}

function listenToKeys() {
    document.addEventListener("keydown", function (event) {
        if (_keylog.length > 10) {
            _keylog.shift();
        }
        _keylog.push(event.key);

        if (validate(_keylog.join(""))) {
            console.log("is valid")
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
    if(shouldReatach()){
        attach();
    }
}


init();