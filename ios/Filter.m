//
//  Filter.m
//  Mappn
//
//  Created by SOTSYS366 on 03/06/22.
//

#import <Foundation/Foundation.h>
#import "React/RCTBridgeModule.h"

@interface RCT_EXTERN_MODULE(Filter,NSObject)

RCT_EXTERN_METHOD(applyEffects:(NSString *)string
                  callback: (RCTResponseSenderBlock)callback)

@end
