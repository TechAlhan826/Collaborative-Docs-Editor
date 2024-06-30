import { useEffect, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { Box } from "@mui/material";
import styled from "@emotion/styled";
import { io } from "socket.io-client";
import { useParams } from 'react-router-dom';

const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote', 'code-block'],
  ['link', 'image', 'video', 'formula'],
  [{ 'header': 1 }, { 'header': 2 }],
  [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
  [{ 'script': 'sub'}, { 'script': 'super' }],
  [{ 'indent': '-1'}, { 'indent': '+1' }],
  [{ 'direction': 'rtl' }],
  [{ 'size': ['small', false, 'large', 'huge'] }],
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  [{ 'color': [] }, { 'background': [] }],
  [{ 'font': [] }],
  [{ 'align': [] }],
  ['clean']
];

const TextEditor = () => {
  const [socket, setSocket] = useState();
  const [quill, setQuill] = useState();
  const { id } = useParams();

  useEffect(() => {
    const Component = styled.div`
      background: #F5F5F5;
    `
    const editorContainer = document.createElement('div');
    editorContainer.setAttribute('id', 'container');
    document.body.appendChild(editorContainer);

    const QuillServer = new Quill('#container', {theme: 'snow', modules: { toolbar: toolbarOptions }});
    setQuill(QuillServer);

    return () => {
      document.body.removeChild(editorContainer);
    }
  }, []);

  useEffect(() => {
    const socketServer = io('http://localhost:9000');
    setSocket(socketServer);

    return () => {
      socketServer.disconnect();
    }
  }, []);

  useEffect(() => {
    if (socket == null || quill == null) return;

    const handleChange = (delta, oldData, source) => {
      if (source !== 'user') return;
      socket.emit('send-changes', delta);
    }

    quill.on('text-change', handleChange);

    return () => {
      quill.off('text-change', handleChange);
    }
  }, [quill, socket]);

  useEffect(() => {
    if (socket == null || quill == null) return;

    const handleChange = (delta) => {
      quill.updateContents(delta);
    }

    socket.on('receive-changes', handleChange);

    return () => {
      socket.off('receive-changes', handleChange);
    }
  }, [quill, socket]);

  useEffect(() => {
    if (quill == null || socket == null) return;

    socket.once('load-document', document => {
      quill.setContents(document);
      quill.enable();
    });

    socket.emit('get-document', id);
  }, [quill, socket, id]);

  useEffect(() => {
    if (socket == null || quill == null) return;

    const interval = setInterval(() => {
      socket.emit('save-document', quill.getContents());
    }, 2000);

    return () => {
      clearInterval(interval);
    }
  }, [socket, quill]);

  return (
    <Box className='container' id='container'></Box>  
  )
}

export default TextEditor;
