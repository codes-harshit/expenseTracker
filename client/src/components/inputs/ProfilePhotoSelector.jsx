import React, { useRef, useState } from 'react'
import { LuUser, LuUpload, LuTrash } from 'react-icons/lu';

const ProfilePhotoSelector = ({image, setImage}) => {
    const inputRef =useRef();
    const [previewUrl, setPreviewUrl] = useState(null);


    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if(file){
            setImage(file);
        }
        const preview = URL.createObjectURL(file);
        setPreviewUrl(preview);
    }

    const handleRemoveImage = () => {
        setImage(null);
        setPreviewUrl(null);
    }

    const onChooseFile = () => {
        inputRef.current.click();
    }
  return (
    <div className='flex justify-center mb-6'>
        <input 
        type="file"
        accept='image/*'
        ref={inputRef}
        onChange={handleImageChange}
        className='hidden'
        />

        {
            !image ? (
                <div className='size-20 flex justify-center items-center bg-purple-100 rounded-full relative'>
                    <LuUser  className='text-4xl text-primary'/>
                    <button 
                    type='button'
                    className='size-8 flex justify-center items-center bg-primary rounded-full absolute -bottom-1 -right-1'
                    onClick={onChooseFile}
                    > <LuUpload/>
                    </button>
                </div>
            ): (
                <div className='relative'>
                    <img src={previewUrl} alt="Profile photo"
                    className='size-20 rounded-full object-cover' />

                    <button className='size-8 flex justify-center items-center bg-red-500 rounded-full absolute -bottom-1 -right-1'
                    type='button'
                    onClick={handleRemoveImage}>
                        <LuTrash/>
                    </button>
                </div>
            )
        }

    </div>
  )
}

export default ProfilePhotoSelector