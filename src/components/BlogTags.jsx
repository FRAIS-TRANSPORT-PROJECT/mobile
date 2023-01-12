import { HStack, Tag } from '@chakra-ui/react';

const BlogTags = (props) => {
  return (
    <HStack
      spacing={2}
      marginTop={props.marginTop}
    >
      {props.tags.map((tag) => {
        return (
          <Tag
            size={'md'}
            variant="solid"
            colorScheme="orange"
            key={Math.random()}
          >
            {tag}
          </Tag>
        );
      })}
    </HStack>
  );
};

export default BlogTags;
