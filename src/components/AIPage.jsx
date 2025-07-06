import React, { useState, useEffect } from 'react';

const AIPage = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [typedTitle, setTypedTitle] = useState('');
  const fullTitle = 'AI Assistance';

  useEffect(() => {
    let i = 0;
    setTypedTitle('');
    const interval = setInterval(() => {
      setTypedTitle((prev) => {
        if (i < fullTitle.length) {
          const next = prev + fullTitle[i];
          i++;
          return next;
        } else {
          clearInterval(interval);
          return fullTitle;
        }
      });
    }, 80);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setResponse('');

    try {
      const res = await fetch('/api/gemini/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) {
        throw new Error('Failed to get a response from the server.');
      }

      const data = await res.json();
      setResponse(data.text);

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: '32px', maxWidth: '700px', margin: '40px auto', background: '#fff', borderRadius: '16px', boxShadow: '0 4px 24px rgba(0,0,0,0.10)', border: '1px solid #e0e0e0' }}>
      <h1 style={{ fontSize: '2.2rem', fontWeight: 700, color: '#1a237e', marginBottom: 8, textAlign: 'center', letterSpacing: '1px', minHeight: '2.5em' }}>
        {typedTitle || 'AI Assistance'}
        <span style={{
          display: 'inline-block',
          width: '1ch',
          background: 'transparent',
          color: '#1a237e',
          animation: 'blink-cursor 1s steps(1) infinite',
          fontWeight: 700
        }}>|</span>
      </h1>
      <style>{`
        @keyframes blink-cursor {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
      `}</style>
      <p style={{ color: '#333', fontSize: '1.1rem', textAlign: 'center', marginBottom: 24 }}>Ask me anything, and I'll do my best to help!</p>

      <form onSubmit={handleSubmit} style={{ marginBottom: 0 }}>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your question or prompt here..."
          rows="4"
          style={{ width: '100%', padding: '14px', fontSize: '1.1rem', borderRadius: '8px', border: '1.5px solid #bdbdbd', marginBottom: 12, resize: 'vertical', background: '#f5f7fa', color: '#222', outline: 'none', transition: 'border 0.2s' }}
        />
        <button
          type="submit"
          disabled={isLoading || !prompt.trim()}
          style={{ 
            marginTop: '6px', 
            padding: '12px 28px', 
            fontSize: '1.1rem', 
            cursor: isLoading ? 'not-allowed' : 'pointer',
            background: isLoading ? '#bdbdbd' : 'linear-gradient(90deg, #1976d2 0%, #512da8 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 600,
            boxShadow: isLoading ? 'none' : '0 2px 8px rgba(25, 118, 210, 0.08)',
            transition: 'background 0.2s, box-shadow 0.2s',
            width: '100%',
            animationName: (!isLoading && prompt.trim()) ? 'bounce' : 'none',
            animationDuration: (!isLoading && prompt.trim()) ? '1s' : undefined,
            animationIterationCount: (!isLoading && prompt.trim()) ? 'infinite' : undefined,
            animationTimingFunction: (!isLoading && prompt.trim()) ? 'cubic-bezier(.36,.07,.19,.97)' : undefined
          }}
        >
          {isLoading ? 'Thinking...' : 'Generate Response'}
        </button>
      </form>

      {error && <div style={{ color: '#d32f2f', marginTop: '24px', textAlign: 'center', fontWeight: 500, fontSize: '1.1rem' }}>Error: {error}</div>}

      {response && (
        <div style={{ marginTop: '32px', padding: '20px', border: '1.5px solid #c5cae9', borderRadius: '10px', background: '#f3f6fd', boxShadow: '0 2px 8px rgba(33, 150, 243, 0.07)' }}>
          <h2 style={{ color: '#283593', fontSize: '1.3rem', fontWeight: 600, marginBottom: 10 }}>Response:</h2>
          <p style={{ whiteSpace: 'pre-wrap', color: '#222', fontSize: '1.08rem', lineHeight: 1.7 }}>{response}</p>
        </div>
      )}

      <style>
      {`
      @keyframes bounce {
        0%, 20%, 50%, 80%, 100% {
          transform: translateY(0);
        }
        40% {
          transform: translateY(-10px);
        }
        60% {
          transform: translateY(-5px);
        }
      }
      `}
      </style>
    </div>
  );
};

export default AIPage;
