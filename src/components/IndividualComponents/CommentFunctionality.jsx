import React, { useState } from 'react';
import { Drawer, Text, Flex, Spacer, Input, DrawerBody, IconButton, Box, Icon, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, Button, List, ListItem, DrawerFooter } from '@chakra-ui/react';
import { authStatus,refreshComments } from '../../recoilAtoms/Auth';
import { addComment, deleteComment, fetchComments } from '../../api/comments';
import { addReply, deleteReply } from '../../api/replies';
import { useRecoilState } from "recoil";
import { MdDeleteOutline } from "react-icons/md"
import { useEffect } from 'react';

function CommentFunctionality({ isOpen, onClose, postId }) {

    const [showReplySection, setShowReplySection] = useState(false);
    const [selectedCommentId, setSelectedCommentId] = useState(0);
    const [commentText, setcommentText] = useState("");
    const [replyText, setReplyText] = useState("");
    const [authStatuss, setAuthStatus] = useRecoilState(authStatus);
    const [refreshComment, setRefreshComment] = useRecoilState(refreshComments);
    const [comments, setComments] = useState([]);


    function handleToggleReply(commentId) {
        setShowReplySection(true);
        setSelectedCommentId(commentId);
    };

    async function getComments() {
        const commentResponse = await fetchComments();
        const commentsArray = Object.values(commentResponse.data);
        const commentsByPost = await commentsArray.filter((entry) => entry.postId === postId);
        setComments(commentsByPost);
        setRefreshComment(!refreshComment);
    }

    async function postReply(commentId) {
        console.log(commentId);
        // add reply
        const replyModel = {
            commentId: commentId,
            userName: authStatuss.userName,
            replyText: replyText,
            createdAt: new Date()
        }
        const replyResponse = await addReply(replyModel);
        console.log(replyResponse);
        setReplyText("");
        getComments();
        setShowReplySection(false);
    }
    async function postComment() {
        const commentModel = {
            postId: postId,
            userName: authStatuss.userName,
            commentText: commentText,
            createdAt: new Date()
        }
        console.log(commentModel);
        const commentResponse = await addComment(commentModel);
        console.log(commentResponse);
        setcommentText("");
        getComments();

    }
    async function deleteCurrentComment(commentId) {
        const response = await deleteComment(commentId);
        console.log(response);
        getComments();
    }
    function handleInputChange(event) {
        if (event.target.name === "comment")
            setcommentText(event.target.value);
        if (event.target.name === "reply")
            setReplyText(event.target.value);
    }
    async function deleteCurrentReply(replyId){
        const response = await deleteReply(replyId);
        console.log(response);
        getComments();
    }
    useEffect(() => {
        getComments();
    }, [])
  return (
    <List spacing={2}>
    {comments.map((comment) => (
        <Box key={comment.commentId} backgroundColor={'brand.200'} padding={2} borderRadius={10}>
        <ListItem key={comment.commentId}>
            <strong>{comment.userName}</strong> {comment.commentText}
            {comment.userName === authStatuss.userName && (
                <IconButton
                    variant="ghost"
                    colorScheme='red'
                    aria-label="Like"
                    icon={<Box fontSize="18px">
                        <Icon as={MdDeleteOutline} />
                    </Box>}
                    width={10}
                    mr={2}
                    onClick={() => deleteCurrentComment(comment.commentId)}
                />
            )}
            <Text fontSize={12} ml={2} onClick={() => handleToggleReply(comment.commentId)} cursor={'pointer'}>Reply</Text>
            <List ml={8}>
                {comment.replies.map((reply) => (
                    <ListItem fontSize={14} key={reply.replyId}>
                        <strong>{reply.userName}</strong> {reply.replyText}
                        {reply.userName === authStatuss.userName && (
                            <IconButton
                                variant="ghost"
                                colorScheme='red'
                                aria-label="Like"
                                icon={<Box fontSize="18px"><Icon as={MdDeleteOutline} /></Box>}
                                width={10}
                                mr={2}
                                onClick={() => deleteCurrentReply(reply.replyId)}
                            />
                        )}
                    </ListItem>
                ))}

            </List>
        </ListItem>
        </Box>
    ))}
</List>
  )
}

export default CommentFunctionality