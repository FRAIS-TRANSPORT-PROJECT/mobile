import { Button } from '@chakra-ui/react';
import React, { Component, useEffect } from 'react';

const images = [];
const CloudinaryUploadWidget = ({ setImages }) => {
  useEffect(() => {
    const cloudName = 'degodfgeg'; // replace with your own cloud name
    const uploadPreset = 'frais-transport'; // replace with your own upload preset

    var myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: cloudName,
        uploadPreset: uploadPreset,
        // cropping: true, //add a cropping step
        // showAdvancedOptions: true,  //add advanced options (public_id and tag)
        // sources: [ "local", "url"], // restrict the upload sources to URL and local files
        multiple: true, //restrict upload to a single file
        folder: 'frais-pfa' //upload files to the specified folder
        // tags: ["users", "profile"], //add the given tags to the uploaded files
        // context: {alt: "user_uploaded"}, //add the given context data to the uploaded files
        // clientAllowedFormats: ["images"], //restrict uploading to image files only
        // maxImageFileSize: 2000000,  //restrict file size to less than 2MB
        // maxImageWidth: 2000, //Scales the image down to a width of 2000 pixels before uploading
        // theme: "purple", //change to a purple theme
      },
      (error, result) => {
        if (!error && result && result.event === 'success') {
          console.log('Done! Here is the image info: ', result.info.secure_url);
          images.push(result.info.secure_url);
          setImages([...images]);
        }
      }
    );
    document.getElementById('upload_widget').addEventListener(
      'click',
      function () {
        myWidget.open();
      },
      false
    );
  }, []);

  return (
    <Button
      id="upload_widget"
      type="submit"
      bg={'blue.400'}
      color={'white'}
      _hover={{
        bg: 'blue.500'
      }}
    >
      Upload
    </Button>
  );
};

export default CloudinaryUploadWidget;
