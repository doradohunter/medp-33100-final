const { Readable } = require('stream');

const uploadToCloudinary = async (req, res, next) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    try {
        const stream = Readable.from(req.file.buffer);
        const uploadStream = req.app.locals.cloudinary.uploader.upload_stream(
            {},
            (error, result) => {
                if (error) {
                    return next(error);
                }
                req.file.cloudinaryUrl = result.secure_url; 
                next();
            }
        );
        stream.pipe(uploadStream);
    } catch (error) {
        next(error);
    }
};

module.exports = uploadToCloudinary;