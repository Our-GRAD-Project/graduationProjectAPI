import { v2 as cloudinary } from 'cloudinary';
import audioModel from '../Models/audioModel.js';

export const uploadAudio = async (path) => {
    const { public_id: audioName, secure_url: audioUrl } =
        await cloudinary.uploader.upload(path,{resource_type: 'video'})
    
    return { audioName, audioUrl }
}



export const createAudio = async (path) => {
    const { audioName, audioUrl } = await uploadAudio(path)
    
    return await audioModel.create({name: audioName, path: audioUrl})

}