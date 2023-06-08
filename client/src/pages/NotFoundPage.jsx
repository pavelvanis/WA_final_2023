import { Box, Heading } from '@chakra-ui/react';
import React from 'react'

export default function NotFoundPage() {
  console.log('notfound');
  return (
    <Box minH='100vh' textAlign='center' pt='10em'>
      <Heading color='blue.300' as="h1" size="xl" mb={4}>
        404 - Not Found
      </Heading>
      <p color='black' >Sorry, the page you're looking for does not exist.</p>
    </Box>
  )
}
