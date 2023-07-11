import React from 'react';
import {loader} from "../../recoilAtoms/Auth";
import {Box, Spinner} from '@chakra-ui/react';
import { useRecoilState, useRecoilValue } from "recoil";
function Loader() {
    const loading = useRecoilValue(loader);
  return (
    <>
    {loading && (
        <Box
            // position="fixed"
            position="absolute"
            zIndex={100}
            h={{base:"calc(100% - 57px)", lg:"100%"}}
            w={{base:"100%", lg: "calc(100% - 300px)"}}
            bg="rgba(255, 255, 255, 0.5)"
            display="flex"
            alignItems="center"
            justifyContent="center"

        >
            <Spinner size="lg" colorScheme={"brand"} color='brand.500' />
        </Box>
    )}
    </>
  )
}

export default Loader