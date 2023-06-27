 
import { defineStyleConfig } from '@chakra-ui/react'
import {colors} from '../constants/contants';
export const Button = defineStyleConfig({
  baseStyle: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    borderRadius: '20px', 
    backgroundColor:colors.primary,
    px: 4, 
    py: 3,
    height:"30px",
  },
  // Two sizes: sm and md
  sizes: {
    mobileS:{
        fontSize: 'sm',
       width:"100px",
    },
    mobileM:{
        fontSize: 'sm',
        width:"100px",
    },
    sm: {
      fontSize: 'sm',
      width:"100px",
    },
    md: {
       
      fontSize: 'sm',
      width:"150px", 
    },
    lg: {
      fontSize: 'sm',
      width:"150px",
    },
    xl: {
      fontSize: 'sm',
      width:"200px",
    },
  },
  variants: {
    outline: {
      border: '2px solid',
      borderColor: 'purple.500',
      color: 'purple.500',
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

