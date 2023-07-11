import React from 'react';
import { colors } from '../../constants/contants';
import { Input } from "@chakra-ui/react";

const CustomInput = ({
  placeholder,
  mb,
  name,
  value,
  onChange,
  type,
  isDisabled,
}) => {
  return (
    <Input
      border="2px"
      mb={mb}
      borderColor="brand.900"
      borderRadius="20px"
      width='100%'
      _hover={{
        borderColor: "secondary",
      }}
      _focus={{
        borderColor: "brand.900",
        boxShadow: "none"
      }}

      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      type={type}
      isDisabled={isDisabled}
    />
  );
};

export default CustomInput;
