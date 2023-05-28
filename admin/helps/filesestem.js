/**
 * Rename file extension and return file name
 * @param {Object} req - Express request object containing uploaded file
 * @returns {String} - Name of the uploaded file with the new extension
 * @throws {Error} - If the uploaded file does not have a valid image extension
 */
import { extname, join, normalize,resolve} from "path";
import { unlinkSync, renameSync,  } from "fs";
import { fileURLToPath } from 'url';
import path from 'path';

// e-commersgach bo'lganyolni qaytaradi 
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDirPath = path.join( __dirname,'../..');  





export function renameAndReturnFileName(req) {
    
    let ext = extname(req.file.originalname);
    let pathFile = normalize(path.join(publicDirPath, req.file.path));
    
    //accept="image/png, image/gif, image/jpeg" 
    if(req.file.mimetype  == "image/png" || req.file.mimetype  == "image/jpeg" || req.file.mimetype  == "image/gif"){
        renameSync(pathFile, pathFile + ext);
        let filenama = req.file.filename + ext;
        return filenama;
    }
    unlinkSync(pathFile)
    return false
  }



  // function req va image name qabul qiladi agar req.file bo'lsa uni qayta ishlaydi (yuqoridagifunction bilan)
  // agar qaytaishlash jarayonida false qaytsa eski suratni o'chirmaydi
  // agar qayta ishlash jarayoni mafaqatli bo'lsa eski suratni o'chiradi

  export function therefileunlinkSync(req, imgname){ 
    if(req.file == undefined){
        return imgname
    }
    let pathFile = normalize(path.join(publicDirPath,req.file.destination, imgname)); 
        const result = renameAndReturnFileName(req)
        if(result){
            if(pathFile)
            unlinkSync(pathFile);
            return result
        }else{
            return result
        }
    }
  
export function deletefile(image){
    let file = normalize(path.join(publicDirPath,"public/uploads/",image));
    if(file && image){
        unlinkSync(file)
    }
  }


 