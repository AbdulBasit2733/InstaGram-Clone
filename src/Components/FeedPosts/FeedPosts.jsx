import {
  Box,
  Container,
  Flex,
  Skeleton,
  SkeletonCircle,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import FeedPost from "./FeedPost/FeedPost";
import useGetFeedPosts from "../../Hooks/useGetFeedPosts";

const FeedPosts = () => {
  const { isLoading, posts } = useGetFeedPosts();

  return (
    <Container maxW={"container.sm"} py={10} px={2}>
      {isLoading &&
        [0, 1, 2].map((_, idx) => (
          <VStack key={idx} gap={4} alignItems={"flex-start"} mb={10}>
            <Flex gap={2}>
              <SkeletonCircle size={10} />
              <VStack gap={2} alignItems={"flex-start"}>
                <Skeleton height={"10px"} w={"200px"} />
                <Skeleton height={"10px"} w={"200px"} />
              </VStack>
            </Flex>
            <Skeleton w={"full"}>
              <Box h={"400px"}>Contents Wrapped</Box>
            </Skeleton>
          </VStack>
        ))}
      {!isLoading &&
        posts.length > 0 &&
        posts.map((post) => <FeedPost key={post.id} post={post} />)}
      {!isLoading && posts.length === 0 && (
        <>
          <Text
            fontSize={"large"}
            justifyContent={"center"}
            textAlign={"center"}
            color={"red.400"}
          >
            Looks like you don&apos;t have any friends.
          </Text>
          <Text
            textAlign={"center"}
            justifyContent={"center"}
            color={"red.400"}
          >
            Stop Coding and go make some!!
          </Text>
        </>
      )}
    </Container>
  );
};

export default FeedPosts;
