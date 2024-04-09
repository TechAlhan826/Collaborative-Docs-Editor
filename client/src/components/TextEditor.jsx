import { useEffect, useState } from "react";

import Quill from "quill";
import "quill/dist/quill.snow.css";

import { Box } from "@mui/material";
import styled from "@emotion/styled";

import { io } from "socket.io-client";
import { useParams } from 'react-router-dom';

const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'code-block'],
  ['link', 'image', 'video', 'formula'],

  [{ 'header': 1 }, { 'header': 2 }],               // custom button values
  [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
  [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
  [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
  [{ 'direction': 'rtl' }],                         // text direction

  [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  [{ 'font': [] }],
  [{ 'align': [] }],

  ['clean']                                         // remove formatting button
];

const TextEditor = () => {
  const [socket, setSocket] = useState();
  const [quill, setQuill] = useState();
  const { id } = useParams();

useEffect(() => {
  const Component = styled.div`
  background: #F5F5F5;
  `

  const QuillServer = new Quill('#container', {theme:'snow', modules: { toolbar : toolbarOptions}})

}, []);

useEffect(() => {
  const socketServer = io('http://localhost:9000');
  setSocket(socketServer);

  return () => {
      socketServer.disconnect();
  }
}, [])

useEffect(() => {
  if (socket === null || quill === null) return;

  const handleChange = (delta, oldData, source) => {
      if (source !== 'user') return;

      socket.emit('send-changes', delta);
  }

  quill && quill.on('text-change', handleChange);

  return () => {
      quill && quill.off('text-change', handleChange);
  }
}, [quill, socket])

  return (
        <Box className='container' id='container'></Box>  

  )
}

export default TextEditor;
