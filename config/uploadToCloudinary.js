const { Readable } = require('stream');

//Custom Cloudinary upload middleware
async function uploadToCloudinary(req,res,next){
    if (!req.file){
        return res.status(400).json({ success: false, message: 'No file uploaded' })
    }
    try{
        const stream = Readable.from(req.file.buffer);
        const uploadStream = req.app.locals.cloudinary.uploader.upload_stream(
            {},
            (error, result) => {
                if (error){
                    return next(error)
                }
                req.file.cloudinaryUrl = result.secure_url //Save Cloudinary URL to the request object
                next();
            }
        );
        stream.pipe(uploadStream);
    } catch (error) {
        console.log(error)
        next(error);
    }
}

module.exports = uploadToCloudinary;