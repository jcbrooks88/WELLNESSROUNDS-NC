import { useState, useRef } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { GET_USER_PROFILE } from "../graphql/user/queries";
import { UPDATE_ABOUT_ME, UPLOAD_AVATAR, ADD_PROFILE_COMMENT } from "../graphql/user/mutations";
import { useParams } from "react-router-dom";
import { IUserProfile } from "@/graphql/user/types";

export const useUserProfile = () => {
  const { _id } = useParams<{ _id: string }>(); // 🔥 1. updated from "username" to "id"

  const { loading, error, data } = useQuery<{ user: IUserProfile }>(GET_USER_PROFILE, {
    variables: { userId: _id },
    skip: !_id,
  });

  const [aboutMe, setAboutMe] = useState<string>("");
  const [isEditing, setIsEditing] = useState(false);
  const [commentText, setCommentText] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [updateAboutMe] = useMutation(UPDATE_ABOUT_ME);
  const [uploadAvatar] = useMutation(UPLOAD_AVATAR);
  const [addProfileComment] = useMutation(ADD_PROFILE_COMMENT);

  const handleAboutMeSave = async () => {
    try {
      await updateAboutMe({ variables: { aboutMe } });
      setIsEditing(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const file = e.target.files[0];

    try {
      await uploadAvatar({ variables: { file } });
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddComment = async () => {
    if (!commentText.trim() || !user?._id) return; // 🛡️ safe guard
  
    try {
      await addProfileComment({
        variables: { userId: user._id, text: commentText },
        update(cache, { data }) {
          if (!data?.addProfileComment) return;
  
          const newComment = data.addProfileComment;
  
          cache.modify({
            id: cache.identify({ __typename: "User", id: user._id }),
            fields: {
              profileComments(existingComments = []) {
                const newCommentRef = cache.writeFragment({
                  data: newComment,
                  fragment: gql`
                    fragment NewProfileComment on ProfileComment {
                      _id
                      text
                      author {
                        username
                      }
                    }
                  `,
                });
                return [newCommentRef, ...existingComments];
              },
            },
          });
        },
      });
  
      setCommentText("");
    } catch (err) {
      console.error(err);
    }
  };
  

  const user = data?.user;

  return {
    loading,
    error,
    user,
    aboutMe,
    setAboutMe,
    isEditing,
    setIsEditing,
    commentText,
    setCommentText,
    fileInputRef,
    handleAboutMeSave,
    handleAvatarUpload,
    handleAddComment,
  };
};
