import {
  Flex,
  GridItem,
  Image,
  Modal,
  ModalContent,
  ModalCloseButton,
  ModalOverlay,
  ModalBody,
  Text,
  useDisclosure,
  Avatar,
  Divider,
  VStack,
  Button,
} from "@chakra-ui/react";
import { AiFillHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Comment from "../../Components/Comment/Comment";
import PostFooter from "../../Components/FeedPosts/FeedPost/PostFooter";
import useUserProfileStore from "../../store/userProfileStore";
import useAuthStore from "../../store/authStore";
import useShowToast from '../../Hooks/useShowToast' 
import { useState } from "react";
import {firestore, storage} from '../../firebase/firebase'
import {deleteObject, ref} from 'firebase/storage'
import { doc,deleteDoc, updateDoc, arrayRemove } from "firebase/firestore";
import usePostStore from "../../store/postStore";
import Caption from "../../Components/Comment/Caption";

const ProfilePost = ({ post }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const authUser = useAuthStore((state) => state.user)
  const userProfile = useUserProfileStore(state => state.userProfile);

  const [isDeleting, setIsDeleting] = useState(false);

  const showToast = useShowToast();
  const deletePost = usePostStore(state => state.deletePost);
  const decrementPostsCount = useUserProfileStore(state => state.deletePost);

  const handleDeletePost = async () => {

    if(!window.confirm('Are you sure you want to delete this post?')) return;
    if(isDeleting) return;
    try {
    
      const imageRef = ref(storage,`posts/${post.id}`); 
      await deleteObject(imageRef);
      const userRef = doc(firestore,'users', authUser.uid);
      await deleteDoc(doc(firestore, 'posts', post.id));
      await updateDoc(userRef, {
        posts:arrayRemove(post.id)
      })

      deletePost(post.id);
      decrementPostsCount(post.id);
      showToast('Success', 'Post deleted successfully', 'success');
    } catch (error) {
      showToast('Error', error.message, 'error');      
    }
    finally {
      setIsDeleting(false);
    }
  }

  return (
    <>
      <GridItem
        cursor={"pointer"}
        borderRadius={4}
        overflow={"hidden"}
        border={"1px solid"}
        borderColor={"whiteAlpha.300"}
        position={"relative"}
        aspectRatio={1 / 1}
        onClick={onOpen}
      >
        <Flex
          opacity={0}
          _hover={{ opacity: 1 }}
          position={"absolute"}
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg={"blackAlpha.700"}
          transition={"all 0.3s ease"}
          zIndex={1}
          justifyContent={"center"}
        >
          <Flex alignItems={"center"} justifyContent={"center"} gap={50}>
            <Flex>
              <AiFillHeart size={20} />
              <Text fontWeight={"bold"} ml={2}>
                {post.likes.length}
              </Text>
            </Flex>
            <Flex>
              <FaComment size={20} />
              <Text fontWeight={"bold"} ml={2}>
                {post.comments.length}
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Image
          src={post.imageURL}
          alt="profile post"
          w={"100%"}
          h={"100%"}
          objectFit={"cover"}
        />
      </GridItem>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered={true}
        size={{ base: "3xl", md: "5xl" }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody bg={"black"} pb={5}>
            <Flex
              gap={4}
              w={{ base: "90%", sm: "70%", md: "full" }}
              mx={"auto"} maxH={'100vh'}
              maxW={'100vh'}
            >
              <Flex
                border={"1px solid"}
                overflow={"hidden"}
                borderColor={"whiteAlpha.300"}
                flex={1.5}
                borderRadius={4}
                justifyContent={'center'}
                alignItems={'center'}
              >
                <Image src={post.imageURL} alt="profile post" />
              </Flex>
              <Flex
                flex={1}
                flexDir={"column"}
                px={10}
                display={{ base: "none", md: "flex" }}
              >
                <Flex alignItems={"center"} justifyContent={"space-between"}>
                  <Flex alignItems={"center"} gap={4}>
                    <Avatar
                      src={userProfile.profilePicURL}
                      size={"sm"}
                      
                    />
                    <Text fontWeight={"bold"} fontSize={12}>
                      {userProfile.username}
                    </Text>
                  </Flex>
                  {authUser?.uid === userProfile.uid && (
                    <Button
                  size={'sm'}
                  bg={'transparent'}
                    _hover={{ bg: "whiteAlpha.300", color: "red.600" }}
                    borderRadius={4}
                    p={1}
                    onClick={handleDeletePost}
                    isLoading={isDeleting}
                  >
                    <MdDelete cursor={"pointer"} size={20} />
                  </Button>
                  )}
                </Flex>
                <Divider my={4} bg={"gray.400"} />
                <VStack
                  w={"full"}
                  alignItems={"start"}
                  maxH={"350px"}
                  overflowY={"auto"}

                >
                {/* CAPTION */}
                {post.caption && <Caption post={post}/>}
                {/* COMMENTS */}
                  {
                    post.comments.map(comment => (
                      <Comment key={comment.id} comment={comment}/>
                    ))
                  }
                  
                </VStack>
                <Divider my={4} bg={"gray.800"} />
                <PostFooter isProfilePage={true} post={post} />
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfilePost;
