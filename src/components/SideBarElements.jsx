import { Box, VStack, HStack, Icon, Text } from '@chakra-ui/react';

const SideBarElement = (props) => {
    const {name,iconName,onClick}=props;
    const IconComponent = iconName;
    return (
        <HStack spacing={2} align="center" _hover={{ bg: 'brand.200', cursor: 'pointer' }} padding="10px 5px 10px 50px" borderRadius={10} onClick={onClick}>
            <Icon as={IconComponent} boxSize={6} />
            <Text fontSize={20}>{name}</Text>
        </HStack>
    );
};

export default SideBarElement;
