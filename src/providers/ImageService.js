const fs = require("fs");
const path = require("path");
const uploadConfig = require("../configs/upload");

class ImageService {
  async saveFile(file) {
    const { filename } = file;
    const filePath = path.resolve(uploadConfig.TMP_FOLDER, filename);
    const newFilePath = path.resolve(uploadConfig.UPLOADS_FOLDER, filename);

    await fs.promises.rename(filePath, newFilePath);

    return filename;
  }

  async deleteFile(file) {
    const filePath = path.resolve(uploadConfig.UPLOADS_FOLDER, file);

    try{
      await fs.promises.stat(filePath);
    } catch {
      return;
    }
    
    await fs.promises.unlink(filePath);
  };


};

module.exports = ImageService;