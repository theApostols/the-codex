// Purpose: Provide a page edit user data

import React from "react";
import { useQuery } from "@apollo/client";
import { VStack, Text, Spinner } from "@chakra-ui/react";
import UserSettingsForm from "../components/UserSettingsForm";
import { Box } from "@chakra-ui/react";

const UserSettings = () => {

  return (
    <Box>

      <UserSettingsForm/>

    </Box>
  );
};

export default UserSettings;
