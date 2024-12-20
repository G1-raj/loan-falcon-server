import { v2 as cloudinary } from "cloudinary";

function fileTypeSupported(type, supportedType) {
    return supportedType.includes(type);
}

const imageUpload = async (file) => {
    try {

        const supported = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.')[1].toLowerCase();

        if(!fileTypeSupported(fileType, supported)) {
            console.log("File type not supported");
        }

        const options = {folder: "loanfalcon"}

        const response = await cloudinary.uploader.upload(file.tempFilePath, options);

        return response.secure_url;

        
    } catch (error) {
        throw new Error(error);
    }
}

export default imageUpload;