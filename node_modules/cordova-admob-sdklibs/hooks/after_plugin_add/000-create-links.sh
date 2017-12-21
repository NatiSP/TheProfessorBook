#!/usr/bin/env bash

echo "Creating necessary links for GoogleAdbom.framework SDK..."

if [ ! -e plugins/cordova-plugin-ad-admobsdk/src/ios/GoogleMobileAds.framework/Headers ]
then
  ln -s plugins/cordova-plugin-ad-admobsdk/src/ios/GoogleMobileAds.framework/Versions/A/Headers/ plugins/cordova-plugin-ad-admobsdk/src/ios/GoogleMobileAds.framework/Headers
fi

if [ ! -e plugins/cordova-plugin-ad-admobsdk/src/ios/GoogleMobileAds.framework/GoogleMobileAds ]
then
  ln -s plugins/cordova-plugin-ad-admobsdk/src/ios/GoogleMobileAds.framework/Versions/A/GoogleMobileAds plugins/cordova-plugin-ad-admobsdk/src/ios/GoogleMobileAds.framework/GoogleMobileAds
fi

if [ ! -e plugins/cordova-plugin-ad-admobsdk/src/ios/GoogleMobileAds.framework/Versions/Current ]
then
  ln -s plugins/cordova-plugin-ad-admobsdk/src/ios/GoogleMobileAds.framework/Versions/A/ plugins/cordova-plugin-ad-admobsdk/src/ios/GoogleMobileAds.framework/Versions/Current
fi

echo "done!"