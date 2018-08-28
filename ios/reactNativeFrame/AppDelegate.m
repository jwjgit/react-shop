/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <React/RCTLinkingManager.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  if ([[UIDevice currentDevice].systemVersion floatValue] >= 10.0) {
    
    JPUSHRegisterEntity * entity = [[JPUSHRegisterEntity alloc] init];
    
    entity.types = UNAuthorizationOptionAlert|UNAuthorizationOptionBadge|UNAuthorizationOptionSound;
    
    [JPUSHService registerForRemoteNotificationConfig:entity delegate:self];
    
  }else if ([[UIDevice currentDevice].systemVersion floatValue] >= 8.0) {
    
    //可以添加自定义categories
    [JPUSHService registerForRemoteNotificationTypes:(UNAuthorizationOptionBadge |
                                                      UNAuthorizationOptionSound |
                                                      UNAuthorizationOptionAlert)
                                          categories:nil];
  }else {
    
    //categories 必须为nil
    [JPUSHService registerForRemoteNotificationTypes:(UNAuthorizationOptionBadge |
                                                      UNAuthorizationOptionSound |
                                                      UNAuthorizationOptionAlert)
                                          categories:nil];
  }
  
  [JPUSHService setupWithOption:launchOptions appKey:appKey
                        channel:nil apsForProduction:isProduction];
  
  
  
  
  
  
  NSURL *jsCodeLocation;

  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
//  jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"reactNativeFrame"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  return YES;
}

- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url
  sourceApplication:(NSString *)sourceApplication annotation:(id)annotation
{
  return [RCTLinkingManager application:application openURL:url
                      sourceApplication:sourceApplication annotation:annotation];
}

//jg
- (void)application:(UIApplication *)application

didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {
  
  [JPUSHService registerDeviceToken:deviceToken];
  
}

- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo {
  
  // 取得 APNs 标准信息内容
  
  [[NSNotificationCenter defaultCenter] postNotificationName:kJPFDidReceiveRemoteNotification object:userInfo];
  
}

- (void)applicationWillEnterForeground:(UIApplication *)application {
  [application setApplicationIconBadgeNumber:0];
  // [application cancelAllLocalNotifications];
}

- (void)application:(UIApplication *)application didReceiveRemoteNotification: (NSDictionary *)userInfo fetchCompletionHandler:(void (^) (UIBackgroundFetchResult))completionHandler {
  
  [[NSNotificationCenter defaultCenter] postNotificationName:kJPFDidReceiveRemoteNotification object:userInfo];
  
}

- (void)jpushNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(NSInteger))completionHandler {
  
  // Required
  
  NSDictionary * userInfo = notification.request.content.userInfo;
  
  if([notification.request.trigger isKindOfClass:[UNPushNotificationTrigger class]]) {
    
    [JPUSHService handleRemoteNotification:userInfo];
    
    [[NSNotificationCenter defaultCenter] postNotificationName:kJPFDidReceiveRemoteNotification object:userInfo];
    
  }
  completionHandler(UNNotificationPresentationOptionAlert); // 需要执行这个方法，选择是否提醒用户，有Badge、Sound、Alert三种类型可以选择设置
}

- (void)jpushNotificationCenter:(UNUserNotificationCenter *)center didReceiveNotificationResponse:(UNNotificationResponse *)response withCompletionHandler:(void (^)())completionHandler {
  
  // Required
  
  NSDictionary * userInfo = response.notification.request.content.userInfo;
  
  if([response.notification.request.trigger isKindOfClass:[UNPushNotificationTrigger class]]) {
    
    [JPUSHService handleRemoteNotification:userInfo];
    
    [[NSNotificationCenter defaultCenter] postNotificationName:kJPFDidReceiveRemoteNotification object:userInfo];
    
  }
  
  completionHandler(); // 系统要求执行这个方法
  
}

- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error {
  
  //Optional
  
  NSLog(@"did Fail To Register For Remote Notifications With Error: %@", error);
  
}



@end
