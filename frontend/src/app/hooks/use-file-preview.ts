import {useEffect, useState} from 'react';

export default function useFilePreview(imageFile: FileList) {
  const [previewImage, setPreviewImage] = useState<string>("");

  useEffect(() => {
    if (imageFile && imageFile[0]) {
      const newImageUrl = URL.createObjectURL(imageFile?.[0]);

      if (newImageUrl !== previewImage) {
        setPreviewImage(newImageUrl);
      }
    }
  }, [imageFile])

  const resetImage = () => {
    setPreviewImage('');
  }

  return {
    previewImage,
    resetImage
  };
}
