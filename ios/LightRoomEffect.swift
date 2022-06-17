//
//  LightRoomEffect.swift
//  PhotoEditor
//
//  Created by SOTSYS382 on 02/06/22.
//

import Foundation
import UIKit
import CoreImage

let sharedContext = CIContext(options: [.useSoftwareRenderer : false])

protocol LightRoomEffectsDelegate {
    func getGrainEffects()-> UIImage?
    func getClarityEffects()-> UIImage?
    func getVignettEffects()-> UIImage?
    
}
public final class LightRoomEffect{
//    private lazy var sharedContext: CIContext = {
//        CIContext(options: [.useSoftwareRenderer : false])
//    }()
    private var image: UIImage!
    
    public init(image: UIImage) {
        self.image = image
    }
}
extension LightRoomEffect : LightRoomEffectsDelegate{
    func getGrainEffects() -> UIImage? {
        guard let  sourceImage : CIImage = CIImage(image: image) else { return nil }
        guard let grainEffect = CIFilter(name: "CINoiseReduction") else { return nil }
        grainEffect.setValue(sourceImage, forKey: kCIInputImageKey)
        grainEffect.setValue(50, forKey: "inputNoiseLevel")
        grainEffect.setValue(0.50, forKey: "inputSharpness")
        return grainEffect.outputImage?.getImageFromOutput()
    }
    
    func getClarityEffects() -> UIImage? {
        guard let  sourceImage : CIImage = CIImage(image: image) else{ return nil }
        guard let clarityEffect = CIFilter(name: "CIUnsharpMask") else { return nil }
        clarityEffect.setValue(sourceImage, forKey: kCIInputImageKey)
        clarityEffect.setValue(10, forKey: kCIInputRadiusKey)
        clarityEffect.setValue(0.2, forKey: kCIInputIntensityKey)
        return clarityEffect.outputImage?.getImageFromOutput()
    }
    
    func getVignettEffects() -> UIImage? {
        guard let  sourceImage : CIImage = CIImage(image: image) else{ return nil }
        guard let vignetteEffect = CIFilter(name: "CIVignette") else { return nil }
        vignetteEffect.setValue(sourceImage, forKey: kCIInputImageKey)
        vignetteEffect.setValue(0.5, forKey: kCIInputRadiusKey)
        vignetteEffect.setValue(5, forKey: kCIInputIntensityKey)
        return vignetteEffect.outputImage?.getImageFromOutput()
    }
}
extension CIImage{
    func getImageFromOutput()-> UIImage?{
        guard let cgImage = sharedContext.createCGImage(self, from: self.extent) else { return nil }
        return UIImage(cgImage: cgImage)
    }
}
