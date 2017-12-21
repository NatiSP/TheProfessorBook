cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-admob-simple/www/AdMob.js",
        "id": "cordova-plugin-admob-simple.AdMob",
        "pluginId": "cordova-plugin-admob-simple",
        "clobbers": [
            "window.plugins.AdMob"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-admob-sdklibs": "2.1.6",
    "cordova-plugin-admob-simple": "3.3.4",
    "cordova-plugin-whitelist": "1.3.3"
}
// BOTTOM OF METADATA
});