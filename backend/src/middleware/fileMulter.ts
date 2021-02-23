import multer from 'multer';

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg'
}

export const storage = multer.diskStorage({
    destination: (req: Express.Request, file: Express.Multer.File, callback: any) => {
        //where image will be uploaded
        callback(null, "images");
    },
    filename: (req: Express.Request, file: Express.Multer.File, callback: any) => {
        callback(null, file.originalname);
    }
});

module.exports = multer({ storage: storage }).single("image");