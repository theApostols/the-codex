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

  let profileImage; //variable to hold profile image file

  const {loading, error, data} = useQuery(GET_ONE_USER,
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

  if (editLoading || loading) return <Spinner/>;
  if (editError) return <Text>Error loading user settings page</Text>;
  if (error) return <Text>Error loading user data</Text>;


  //update profile image value when a file is selected
  const handleFileSelection = (event) =>
  {
    profileImage = event.target.files[0];
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

    try
    {
      let image = ''; //variable to hold file name of profile image

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

        {/* <img src = {`/images/${data.oneUser.image}`}></img> */}

        <img src = {`https://i.guim.co.uk/img/media/fbb1974c1ebbb6bf4c4beae0bb3d9cb93901953c/10_7_2380_1428/master/2380.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=223c0e9582e77253911be07c8cad564f`}></img>
        <Button>Clear Image</Button>

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
