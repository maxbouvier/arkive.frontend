//
//  Filter.swift
//  Mappn
//
//  Created by SOTSYS366 on 03/06/22.
//

import Foundation
@objc(Filter)
class Filter: NSObject{
  
  @objc
  func applyEffects(_ path:String,callback:RCTResponseSenderBlock){
    //    print("Counter",name);
    let imgPath = UIImage (contentsOfFile: path)?.fixImageOrientation()
    //
    //    guard let imageUrl = URL(string: path) else { return }
    //            guard let imageData = try? Data(contentsOf: imageUrl) else{return}
    //    let img = UIImage(data: imageData)
    guard let image = imgPath?.applyLUT(LUT: "Lut1") else{ return}
    var finalImage : UIImage? = image
    finalImage = LightRoomEffect(image: image).getGrainEffects()
//    ////
    finalImage = LightRoomEffect(image: finalImage!).getClarityEffects()
//    ////
    finalImage = LightRoomEffect(image: finalImage!).getVignettEffects()
    // callback(["ABcd"])
    let arrImage = [UIImage.init(named: "overlay1"),UIImage.init(named: "overlay2"),UIImage.init(named: "overlay3"),UIImage.init(named: "overlay4"),UIImage.init(named: "overlay5"),UIImage.init(named: "overlay6")].randomElement()
    if let overlayImage = arrImage,let finalImg = finalImage{
      
      let layerImage = getDustTexture(image: overlayImage!, size: finalImg.size, value: 1.0)
      finalImage = layerImage.alpha(0.3).drawAbove(image: finalImg)
      
    }
    
    
    let uuid = UUID().uuidString
    
    FileManager.delete(at: FileManager.imagePath)
    
    let imagePath = FileManager.imagePath.appendingPathComponent("\(uuid).png")
    _ = FileManager.save((finalImage?.pngData())!, savePath: imagePath)
    
    callback([imagePath])
    
    
  }
  
  @objc
  static func requireMainQueueSetup() ->Bool {
    return true;
  }
  
  @objc
  func constantsToExport() ->[String:Any]!{
    return ["initialCount":0]
  }
}

extension UIImage {
    func fixImageOrientation() -> UIImage {
        UIGraphicsBeginImageContext(self.size)
        self.draw(at: .zero)
        let newImage = UIGraphicsGetImageFromCurrentImageContext()
        UIGraphicsEndImageContext()
        return newImage ?? self
    }
}




public extension FileManager {
  /// 存文件到沙盒
  ///
  /// - Parameters:
  ///   - data: 数据源
  ///   - savePath: 保存位置
  /// - Returns: 删除或者保存错误
  public class func save(_ data: Data, savePath: String) -> Error? {
    if FileManager.default.fileExists(atPath: savePath) {
      do {
        try FileManager.default.removeItem(atPath: savePath)
      } catch let error  {
        return error
      }
    }
    do {
      try data.write(to: URL(fileURLWithPath: savePath))
    } catch let error {
      return error
    }
    return nil
  }
  
  
  public class func save(content: String, savePath: String) -> Error? {
    if FileManager.default.fileExists(atPath: savePath) {
      do {
        try FileManager.default.removeItem(atPath: savePath)
      } catch let error  {
        return error
      }
    }
    do {
      try content.write(to: URL(fileURLWithPath: savePath), atomically: true, encoding: .utf8)
    } catch let error {
      return error
    }
    return nil
  }
  
  
  /// 在沙盒创建文件夹
  ///
  /// - Parameter path: 文件夹地址
  /// - Returns: 创建错误
  @discardableResult
  public class func create(at path: String) -> Error? {
    if (!FileManager.default.fileExists(atPath: path)) {
      do {
        try FileManager.default.createDirectory(atPath: path, withIntermediateDirectories: true, attributes: nil)
      } catch let error {
        print("error:\(error)")
        return error
      }
    }
    return nil
  }
  
  /// 在沙盒中删除文件
  ///
  /// - Parameter path: 需要删除的文件地址
  /// - Returns: 删除错误
  @discardableResult
  public class func delete(at path: String) -> Error? {
    if (FileManager.default.fileExists(atPath: path)) {
      do {
        try FileManager.default.removeItem(atPath: path)
      } catch let error {
        return error
      }
      return nil
    }
    return NSError(domain: "File does not exist", code: -1, userInfo: nil) as Error
  }
  
  public class func rename(oldFileName: String, newFileName: String) -> Bool {
    do {
      try FileManager.default.moveItem(atPath: oldFileName, toPath: newFileName)
      return true
    } catch {
      print("error:\(error)")
      return false
    }
  }
  
  public class func copy(oldFileName: String, newFileName: String) -> Bool {
    do {
      try FileManager.default.copyItem(atPath: oldFileName, toPath: newFileName)
      return true
    } catch {
      return false
    }
  }
  
  public class var document: String {
    get {
      return NSSearchPathForDirectoriesInDomains(.documentDirectory, .userDomainMask, true)[0]
    }
  }
  
  public class var library: String {
    get {
      return NSSearchPathForDirectoriesInDomains(.libraryDirectory, .userDomainMask, true)[0]
    }
  }
  
  public class var temp: String {
    get {
      return NSTemporaryDirectory()
    }
  }
  
  public class var imagePath: String{
    get{
      let path = document.appendingPathComponent("Image")
      FileManager.create(at: path)
      return path
    }
  }
  
  public class var caches: String {
    get {
      return NSSearchPathForDirectoriesInDomains(.cachesDirectory, .userDomainMask, true)[0]
    }
  }
  
  public class var log: String {
    get {
      return document.appendingPathComponent("Logs")
    }
  }
}

extension String{
  public func appendingPathComponent(_ path: String) -> String {
    let string = NSString(string: self)
    
    return string.appendingPathComponent(path)
  }
}



func getDustTexture(image:UIImage,size:CGSize,value:Float) -> UIImage{
  UIGraphicsBeginImageContext(size)
  let areaSize = CGRect(x: 0, y: 0, width: size.width, height: size.height)
  image.draw(in: areaSize)
  //    let imgTexture = texture
  //    imgTexture.draw(in: areaSize, blendMode: .colorDodge, alpha: CGFloat(value))
  let newImage = UIGraphicsGetImageFromCurrentImageContext()!
  UIGraphicsEndImageContext()
  return newImage
}

extension UIImage {
  func alpha(_ value:CGFloat) -> UIImage {
    UIGraphicsBeginImageContextWithOptions(size, false, scale)
    draw(at: CGPoint.zero, blendMode: .normal, alpha: value)
    let newImage = UIGraphicsGetImageFromCurrentImageContext()
    UIGraphicsEndImageContext()
    return newImage!
  }
}

extension UIImage{
  
  func drawAbove(image: UIImage) -> UIImage {
    return image.drawUnder(image: self)
  }
  
  func drawUnder(image: UIImage) -> UIImage {
    let maxWidth = max(self.size.width, image.size.width)
    let maxHeight = max(self.size.height, image.size.height)
    let maxSize = CGRect(origin: .zero, size: CGSize(width: maxWidth, height: maxHeight))
    
    UIGraphicsBeginImageContextWithOptions(maxSize.size, false, self.scale)
    if let context = UIGraphicsGetCurrentContext() {
      let t = CGAffineTransform(a: 1, b: 0, c: 0, d: -1, tx: 0, ty: maxSize.height)
      context.concatenate(t)
      context.interpolationQuality = .high
      
      let imRect_0 = CGRect(center: maxSize.center, size: self.size)
      context.draw(self.cgImage!, in: imRect_0)
      
      let imRect_1 = CGRect(center: maxSize.center, size: image.size)
      context.draw(image.cgImage!, in: imRect_1)
      
      let newImage = UIImage(cgImage: context.makeImage()!, scale: self.scale, orientation: self.imageOrientation)
      UIGraphicsEndImageContext()
      
      return newImage.withRenderingMode(self.renderingMode)
    }
    UIGraphicsEndImageContext()
    return self
  }
}

extension CGRect {
  init(center: CGPoint, size: CGSize) {
    self.init(x: center.x - (size.width / 2), y: center.y - (size.height / 2), width: size.width, height: size.height)
  }
}


extension CGRect {
  /// EZSE: Easier initialization of CGRect
  public init(x: CGFloat, y: CGFloat, w: CGFloat, h: CGFloat) {
    self.init(x: x, y: y, width: w, height: h)
  }
  
  /// EZSE: X value of CGRect's origin
  public var x: CGFloat {
    get {
      return self.origin.x
    } set(value) {
      self.origin.x = value
    }
  }
  
  /// EZSE: Y value of CGRect's origin
  public var y: CGFloat {
    get {
      return self.origin.y
    } set(value) {
      self.origin.y = value
    }
  }
  
  /// EZSE: Width of CGRect's size
  public var w: CGFloat {
    get {
      return self.size.width
    } set(value) {
      self.size.width = value
    }
  }
  
  /// EZSE: Height of CGRect's size
  public var h: CGFloat {
    get {
      return self.size.height
    } set(value) {
      self.size.height = value
    }
  }
  
  /// EZSE : Surface Area represented by a CGRectangle
  public var area: CGFloat {
    return self.h * self.w
  }
  
  var center: CGPoint {
    get {
      return CGPoint(x: self.midX, y: self.midY)
    }
    set {
      self.origin.x = newValue.x - (width / 2)
      self.origin.y = newValue.y - (height / 2)
    }
  }
}
