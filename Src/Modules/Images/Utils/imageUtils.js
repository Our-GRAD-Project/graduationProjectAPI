import { v2 as cloudinary } from 'cloudinary';
import imageModel from '../Models/imageModel.js';

export const uploadImage = async (path) => {
    const { public_id: imageName, secure_url: imageUrl } =
        await cloudinary.uploader.upload(path)
    
    return { imageName, imageUrl }
}

export const deleteImage = async (imageName) => {
    await cloudinary.uploader.destroy(imageName)
}

export const createImage = async (path) => {
    const { imageName, imageUrl } = await uploadImage(path)
    
    return await imageModel.create({name: imageName, path: imageUrl})

}