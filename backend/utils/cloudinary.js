import { Readable} from "stream"
import { config } from "dotenv";
config()

import { v2 } from "cloudinary";

v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
async function bufferUpload (buffer) {
  try {
    return new Promise((resolve, reject) => {
      const writeStream = v2.uploader.upload_stream((err, result) => {
        if (err) {
          reject(err);
          return;
        } 
        
        resolve(result);
      });
      const readStream = new Readable({
        read() {
          this.push(buffer);
          this.push(null);
        },
      });
      readStream.pipe(writeStream);
    });
  } catch (error) {
    console.log(error)
  }

};

// delete image
const deleteImage = async (imagePublicId) => {
  try {
    const result = await v2.uploader.destroy(imagePublicId);
    // console.log(result);
    return result;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to delete image from Cloudinary');
  }
};

export {bufferUpload, deleteImage}

