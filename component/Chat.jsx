import React, { useState } from 'react';
import styles from '../styles/Chat.module.css';

const dummyData = [
  { id: 1, user: '0xabc...', message: 'Hello!', timestamp: new Date() },
  { id: 2, user: '0xdef...', message: 'Hi!', timestamp: new Date() },
  // Add more messages here...
];

const Chat = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(dummyData);

  const handleSendMessage = () => {
    // TODO: Implement this with your logic to send a message.
    setMessages(prevMessages => [...prevMessages, { id: Math.random(), user: 'Me', message, timestamp: new Date() }]);
    setMessage('');
  };

  return (
    <div className={styles.chatContainer} style={{ display: isOpen ? 'flex' : 'none' }}>
      <div className={styles.chatHeader}>
        <h4>Chat</h4>
        <button onClick={() => setIsOpen(false)}>Close</button>
      </div>
      <div className={styles.chatBody}>
        {messages.map(({ id, user, message, timestamp }) => (
          <div key={id} className={styles.message}>
            <div className={styles.user}>{user}</div>
            <div>{message}</div>
            <div className={styles.timestamp}>{timestamp.toLocaleString()}</div>
          </div>
        ))}
      </div>
      <div className={styles.chatInput}>
        <input type="text" value={message} onChange={e => setMessage(e.target.value)} />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
