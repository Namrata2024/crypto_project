import {Alert, AlertIcon } from '@chakra-ui/react'
import React from 'react'

function ErrorBox({message}) {
  return <Alert
    status="error"
    position={"fixed"}
    top={"9"}
    left={"50%"}
    transform={"translatex(-50%"}
    w={"container.lg"}
  >
    <AlertIcon />
    {message}
  </Alert>
}

export default ErrorBox
