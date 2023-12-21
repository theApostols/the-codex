// Purpose: Provide a page to let a user change their account details

import React, {useState} from 'react';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { VStack, Text, Spinner, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import {EDIT_USER} from '../../utils/mutations.js';
import {GET_ONE_USER} from '../../utils/queries.js';
import Auth from '../../utils/auth.js';

const UserSettingsForm = () =>
{
  //retrieves the username of the currently logged-in user via the JWT
  const currentUser = Auth.getProfile().data.username;

  console.log(currentUser);

  const {loading: userLoading, error: userError, data: userData} = useQuery(GET_ONE_USER,
  {
    variables: {username: currentUser}
  });

  const [editUser, {loading: editLoading, error: editError, data: editData}] = useMutation(EDIT_USER);
  const [userFormData, setUserFormData] = useState(
  {
    username: '',
    password: '',
    currentPassword: ''
  });

  if (editLoading || userLoading) return <Spinner/>;
  if (editError) return <Text>Error loading user settings page</Text>;
  if (userError) return <Text>Error loading user data</Text>;

  let profileImage; //variable to hold profile image file

  //clears the chose profile picture file
  const handleClearImage = () =>
  {
    console.log('clearing image');
    const profileImageInput = document.getElementById('profileImageInput'); //gets a reference to the profile image input
    profileImageInput.value = ''; //clears the chosen file in the input
    profileImage = ''; //resets the profile image variable to an empty string

    //gets a reference to preview image element for the profile picture & sets the src to an empty string
    const profileImagePreviewElement = document.getElementById('profile-image-preview');
    profileImagePreviewElement.setAttribute('src', '/images/file-uploads/default-profile');
  }

  //update profile image value when a file is selected
  const handleFileSelection = (event) =>
  {
    console.log('file selected');
    //gets a reference to preview image element for the profile picture
    const profileImagePreviewElement = document.getElementById('profile-image-preview');

    //retrieves the file stored in the profile image input
    profileImage = event.target.files[0];

    console.log(profileImage);

    const uploadConverter = new FileReader(); //creates a new FileReader instance to read the above file
    uploadConverter.readAsDataURL(profileImage); //convert the upload to a usable URL for an 'src' attribute

    //upon the above conversion completing, set the 'src' attribute of the preview image element to the resulting URL
    //i.e. renders a preview of the uploaded file to the page
    uploadConverter.addEventListener('load', () =>
    {
      profileImagePreviewElement.setAttribute('src', uploadConverter.result);
    });
  }

  //update user form data upon a text input being changed
  const handleInputChange = (event) =>
  {
    const {name, value} = event.target;
    setUserFormData({...userFormData, [name]: value});
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault(); //prevent default form submission behaviour

    //if the user did not fill in the current password field, eject from the function
    if (!userFormData.currentPassword)
    {
      return;
    }

    console.log('submitting data');

    try
    {
      let image = 'default-profile'; //variable to hold file name of profile image, set to 'default-profile' by default

      console.log(profileImage);

      //checks if a file was uploaded to the profile image input
      if (profileImage)
      {
        //constructs a new FormData instance & appends the uploaded file to it
        const formData = new FormData();
        formData.append('file', profileImage);
  
        //if the node environment is set to 'production', set the server host to the render address
        //otherwise, set the server host to the localhost address
        const serverHost = process.env.NODE_ENV === 'production' ? '' /* RENDER ADDRESS GOES HERE */ : 'http://localhost:3001';
  
        //makes a POST request to the server host using the form data to upload the file to the database via multer
        const response = await fetch(`${serverHost}/file-upload`,
        { 
          method: 'POST',
          body: formData
        });
  
        //processes the newly-generated file name as a JSON response
        image = await response.json();
      }

      //if the user did not fill out the new username field, update the form data value to their current username
      if (!userFormData.username)
      {
        userFormData.username = currentUser;
      }

      //if the user did not fill out the new password field, update the form data value to their current password
      if (!userFormData.password)
      {
        userFormData.password = userFormData.currentPassword;
      }

      console.log(image);

      //updates the user's data using the form data & uploaded image name
      const {data} = await editUser(
      {
        variables: {currentUser, ...userFormData, image},
      });

      //extracts the JWT returned from the mutation & updates the JWT in the client's local storage with it
      const {token, updatedUser} = data.editUser;
      Auth.login(token);
    }
    catch (error) //logs any errors to console
    {
      console.error('Failed to update user data;', error);
    }
  };

  return (
    <VStack align = 'stretch' spacing={4} p={4}>
      
      <form encType = 'multipart/form-data' onSubmit = {handleFormSubmit}>

        <img id = 'profile-image-preview' src = {`/images/file-uploads/${userData.oneUser.image}`}></img>

        <Button onClick = {handleClearImage}>Clear Image</Button>

        <FormControl id = 'username'>
          <FormLabel htmlFor = 'username'>New Username</FormLabel>
          <Input
            autoComplete = 'username'
            type = 'text'
            name = 'username'
            onChange = {handleInputChange}
            value = {userFormData.username}
          />
        </FormControl>

        <FormControl id = 'password'>
          <FormLabel htmlFor = 'password'>New Password</FormLabel>
          <Input
            autoComplete = 'new-password'
            type = 'password'
            name = 'password'
            onChange = {handleInputChange}
            value = {userFormData.password}
          />
        </FormControl>

        <FormControl id = 'currentPassword' isRequired>
          <FormLabel htmlFor = 'currentPassword'>Current Password</FormLabel>
          <Input
            autoComplete = 'new-password'
            type = 'password'
            name = 'currentPassword'
            onChange = {handleInputChange}
            value = {userFormData.currentPassword}
          />
        </FormControl>

        <input type = 'file' accept = 'image/*' id = 'profileImageInput' onChange = {handleFileSelection}></input>
        
        <Button type = 'submit'>Update Data</Button>

      </form>

    </VStack>
  );
};

export default UserSettingsForm;
