import React from 'react'
import {Box, Text} from "@chakra-ui/react"

function EmptyComponent({ message }) {
    return (
        <>
        <Box display={'flex'} justifyContent={'center'} alignItems={"center"} height={'70vh'} width={'100%'}>
            <Text>{message}</Text>
        </Box>
        </>
    )
}

export default EmptyComponent