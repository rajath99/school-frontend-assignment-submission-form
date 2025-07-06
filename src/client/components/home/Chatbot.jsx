import React, { useState, useRef } from 'react';
import { Box, Typography, Paper, TextField, Button, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello! How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const chatRef = useRef();

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { sender: 'user', text: input };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput('');
    try {
      // Replace with your AI/chatbot API endpoint
      const res = await axios.post('/api/ai-chat', { message: input });
      setMessages((msgs) => [...msgs, { sender: 'bot', text: res.data.reply }]);
    } catch (err) {
      setMessages((msgs) => [...msgs, { sender: 'bot', text: 'Sorry, there was an error.' }]);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', my: 4 }}>
      <Typography variant="h5" align="center" gutterBottom>AI Chatbot</Typography>
      <Paper ref={chatRef} sx={{ minHeight: 250, maxHeight: 350, overflowY: 'auto', p: 2, mb: 2 }}>
        {messages.map((msg, idx) => (
          <Box key={idx} sx={{ textAlign: msg.sender === 'user' ? 'right' : 'left', mb: 1 }}>
            <Typography variant="body2" color={msg.sender === 'user' ? 'primary' : 'secondary'}>
              <b>{msg.sender === 'user' ? 'You' : 'AI'}:</b> {msg.text}
            </Typography>
          </Box>
        ))}
      </Paper>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Type your message..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
        />
        <IconButton color="primary" onClick={handleSend} aria-label="send">
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Chatbot;
