// import { v2 as cloudinary } from 'cloudinary';
const cloudinary = require("cloudinary").v2;

async function connectToCloudinary() {
  // Configuration
  cloudinary.config({
    cloud_name: "dpv3r9vqy",
    api_key: "757173236613825",
    api_secret: "56NDpPDQYKDP-tntXx6Tlo6Rz3o", // Click 'View API Keys' above to copy your API secret
  });

  // Upload an image
//   const uploadResult = await cloudinary.uploader
//     .upload(
//       "https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg",
//       {
//         public_id: "shoes",
//       }
//     )
//     .catch((error) => {
//       console.log(error);
//     });

//   console.log(uploadResult);

//   // Optimize delivery by resizing and applying auto-format and auto-quality
//   const optimizeUrl = cloudinary.url("shoes", {
//     fetch_format: "auto",
//     quality: "auto",
//   });

//   console.log(optimizeUrl);

//   // Transform the image: auto-crop to square aspect_ratio
//   const autoCropUrl = cloudinary.url("shoes", {
//     crop: "auto",
//     gravity: "auto",
//     width: 500,
//     height: 500,
//   });

//   console.log(autoCropUrl);

  return cloudinary;
}

module.exports = connectToCloudinary;
