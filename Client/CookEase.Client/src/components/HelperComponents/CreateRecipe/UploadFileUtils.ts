import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  if (event.target.files && event.target.files.length > 0) {
    const file = event.target.files[0];
    const allowedTypes = ['image/jpeg', 'image/png'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!allowedTypes.includes(file.type)) {
      toast.error('Invalid file type. Please upload a PNG or JPEG image.')
      return;
    }

    if (file.size > maxSize) {
      toast.error('File size exceeds the limit of 10MB.')
      return;
    }

    //toast.success('Image uploaded successfully!');
    console.log('Selected file:', file);
    // TODO: Handle the selected file here
  }
};
