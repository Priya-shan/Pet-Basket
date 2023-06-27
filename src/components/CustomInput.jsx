import { inputAnatomy as parts } from "@chakra-ui/anatomy"
import {
  createMultiStyleConfigHelpers,
  defineStyle,
} from "@chakra-ui/styled-system"
import { getColorVar, mode } from "@chakra-ui/theme-tools"
const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys)

const baseStyle = definePartsStyle({
  field: {
    
    },
})
const variantOutline = definePartsStyle((props) => {
    const { theme } = props
    // const { focusBorderColor: fc, errorBorderColor: ec } = getDefaults(props)
  
    return {
      field: {
        border: "5px solid black",
        _hover: {
            border: "5px solid red",
        },
        _focusVisible: {
          zIndex: 1,
          border: "5px solid green",
        },
      },
      addon: {
        border: "5px solid purple",
      },
    }
  })

const variants = {
  outline: variantOutline,
}

export const inputTheme = defineMultiStyleConfig({
  baseStyle,
  variants,
  defaultProps: {
    size: "md",
    variant: "outline",
  },
})