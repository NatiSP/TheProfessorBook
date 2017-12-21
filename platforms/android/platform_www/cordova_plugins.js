cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
  {
    "id": "cordova-plugin-admob-simple.AdMob",
    "file": "plugins/cordova-plugin-admob-simple/www/AdMob.js",
    "pluginId": "cordova-plugin-admob-simple",
    "clobbers": [
      "window.plugins.AdMob"
    ]
  },
  {
    "id": "cordova-plugin-inapppurchase.InAppBillingV3",
    "file": "plugins/cordova-plugin-inapppurchase/www/index-android.js",
    "pluginId": "cordova-plugin-inapppurchase",
    "merges": [
      "inAppPurchase"
    ]
  }
];
module.exports.metadata = 
// TOP OF METADATA
{
  "cordova-plugin-whitelist": "1.3.3",
  "cordova-admob-sdklibs": "2.1.6",
  "cordova-plugin-admob-simple": "3.3.4",
  "cordova-plugin-inapppurchase": "1.1.0"
};
// BOTTOM OF METADATA
});