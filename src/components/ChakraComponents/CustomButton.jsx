 
import { defineStyleConfig } from '@chakra-ui/react'
import {colors} from '../../constants/contants';
export const Button = defineStyleConfig({
  baseStyle: {
    // fontWeight: 'bold',
    // textTransform: 'uppercase',
    borderRadius: '20px', 
    backgroundColor:'brand.400',
    color:'black',
    px: 4, 
    py: 3,
    height:"30px",
    colorScheme:'brand'
  },
  // Two sizes: sm and md
  sizes: {
    mobileS:{
        fontSize: 'sm',
       width:"80px",
       px:2
    },
    mobileM:{
        fontSize: 'sm',
        width:"80px",
        px:2
    },
    sm: {
      fontSize: 'sm',
      width:"80px",
      px:2
    },
    md: {
       
      fontSize: 'md',
      width:"150px", 
    },
    lg: {
      fontSize: 'md',
      width:"150px",
    },
    xl: {
      fontSize: 'md',
      width:"200px",
    },
  },
  variants: {
    outline: {
      border: '2px solid',
      borderColor: 'brand.900',
      color: 'black',
      fontWeight:'700'
    },
    solid: {
      bg: 'purple.500',
      color: 'white',
    },
  },
  defaultProps: {
    size: 'md',
    variant: 'outline',
  },
})

