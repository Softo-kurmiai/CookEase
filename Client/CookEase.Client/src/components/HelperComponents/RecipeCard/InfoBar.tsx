import InfoTypography from "./InfoTypography";
import axios from 'axios';
import React from 'react';
import Stack from '@mui/material/Stack';
import { Visibility, Favorite, Comment } from "@mui/icons-material";


interface InfoBarProps {
    authorId: number | undefined;
    viewCount: number;
    likeCount: number;
    commentCount: number;
  }

  export function InfoBar({ authorId, viewCount, likeCount, commentCount}: InfoBarProps) {

    const [authorName, setAuthorName] = React.useState("Gabubu");

    React.useEffect(() => {
        getAuthor(authorId);
    }, [authorId]);

    async function getAuthor(creatorId: number | undefined) {
        if(creatorId == undefined) {
            setAuthorName("");
            console.log("Could not get author name");
        } 
        else {
            axios.get(`/api/users/${creatorId}`)
        .then(response => {
        setAuthorName(response.data.username);
        })
        }}
    
    return (
      <Stack direction="row" spacing={0.7} sx={{ pt: 1 }}>
        <InfoTypography>{authorName}</InfoTypography>
        <Visibility sx={{ color: 'info.main' }} />
        <InfoTypography>{viewCount}</InfoTypography>
        <Comment sx={{ color: 'info.main' }} />
        <InfoTypography>{commentCount}</InfoTypography>
        <Favorite sx={{ color: 'info.main' }} />
        <InfoTypography>{likeCount}</InfoTypography>
      </Stack>
    );
  }

export default InfoBar;