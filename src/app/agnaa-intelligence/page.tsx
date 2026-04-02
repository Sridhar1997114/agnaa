'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './page.module.css';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  options?: { label: string; link: string }[];
}

const QUICK_ACTIONS = [
  { label: '🏡 Estimate my house cost', prompt: 'How much will it cost to build a 1200 sft house in Hyderabad?' },
  { label: '📐 What can I build on my plot?', prompt: 'Can I build G+2 on a 200 sq yd plot in Hyderabad?' },
  { label: '🧱 Calculate bricks/blocks', prompt: 'How many bricks do I need for a 20x10 ft wall at 10 ft height?' },
  { label: '🏗️ RCC slab quantities', prompt: 'Give me slab quantities for 30x40 ft area, 5 inch thickness.' },
  { label: '🎨 Paint & tile calculator', prompt: 'How many litres of paint for 1200 sft house interior?' },
  { label: '📋 Get full BOQ on WhatsApp', prompt: 'I want a complete BOQ for my project sent to WhatsApp.' },
  { label: '👷 Talk to Agnaa Constructions', prompt: 'I need contractor support for my plot in Hyderabad.' },
];

const INITIAL_MESSAGE: Message = {
  role: 'assistant',
  content: `Namaste! I'm **Agnaa Intelligence** — your construction-aware project advisor for Hyderabad.\n\nI can help you with:\n• **Cost estimates** — rough to detailed BOQ\n• **Calculator routing** — bricks, slab, steel, tiles, paint, and 18 more\n• **Plot buildability** — G+1, G+2, G+3 feasibility\n• **Execution planning** — materials, phases, contractor connect\n\nAll 23 calculators are free to use. What's your project about?`,
};

export default function AgnaaIntelligencePage() {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (messageText?: string) => {
    const trimmed = (messageText || input).trim();
    if (!trimmed || loading) return;

    setShowQuickActions(false);
    const newMessages: Message[] = [...messages, { role: 'user', content: trimmed }];
    setMessages(newMessages);
    setInput('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
    setLoading(true);

    try {
      const res = await fetch('/api/agnaa-intelligence', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      
      setMessages([
        ...newMessages,
        {
          role: 'assistant',
          content: data.reply || `⚠️ ${data.error || 'Something went wrong. Please try again.'}`,
          options: data.options,
        },
      ]);
    } catch {
      setMessages([...newMessages, { role: 'assistant', content: '⚠️ Connection error. Please refresh and try again.' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatMessage = (msg: Message) => {
    const isUser = msg.role === 'user';
    const content = msg.content;
    const options = msg.options;

    return (
      <>
        {content.split('\n').map((line, i) => {
          if (line.startsWith('## ')) return <div key={i} className={styles.msgHeading}>{line.slice(3)}</div>;
          if (line.startsWith('• ') || line.startsWith('- ')) return <div key={i} className={styles.msgBullet}>· {line.slice(2)}</div>;
          if (line === '') return <div key={i} style={{ height: '5px' }} />;
          
          // Improved parsing for bold AND links
          const parts = line.split(/(\*\*.+?\*\*|\[.+?\]\(.+?\))/g);
          
          return (
            <div key={i}>
              {parts.map((p, j) => {
                if (p.startsWith('**') && p.endsWith('**')) {
                  return <strong key={j} className={`${styles.msgBold} ${isUser ? styles.inUser : ''}`}>{p.slice(2, -2)}</strong>;
                }
                if (p.startsWith('[') && p.includes('](')) {
                  const match = p.match(/\[(.+?)\]\((.+?)\)/);
                  if (match) {
                    return (
                      <a key={j} href={match[2]} target="_blank" rel="noopener noreferrer" className={styles.msgLink}>
                        {match[1]}
                      </a>
                    );
                  }
                }
                return p;
              })}
            </div>
          );
        })}
        {options && options.length > 0 && (
          <div className={styles.fallbackOptions}>
            {options.map((opt, i) => (
              <a key={i} href={opt.link} className={styles.optBtn}>
                {opt.label}
              </a>
            ))}
          </div>
        )}
      </>
    );
  };

  return (
    <div className={styles.aiPage}>
      {/* Identity Bar */}
      <div className={styles.aiIdentityBar}>
        <div className={styles.aiLogoChip}>
          <div className={styles.aiLogoIcon}>AI</div>
          <div className={styles.aiTitleGroup}>
            <span className={styles.aiTitleMain}>Agnaa Intelligence</span>
            <span className={styles.aiTitleSub}>AI · Hyderabad</span>
          </div>
        </div>
        <div className={styles.aiStatusBadge}>
          <div className={styles.statusDot} />
          Online
        </div>
      </div>

      {/* Chat */}
      <div className={styles.chatScroll} id="chat-scroll">
        {messages.map((msg, i) => (
          <div key={i} className={`${styles.msgRow} ${msg.role === 'user' ? styles.user : ''}`}>
            <div className={`${styles.avatar} ${msg.role === 'user' ? styles.userAv : styles.aiAv}`}>
              {msg.role === 'user' ? 'U' : 'AI'}
            </div>
            <div className={`${styles.bubble} ${msg.role === 'user' ? styles.userB : styles.aiB}`}>
              {formatMessage(msg)}
            </div>
          </div>
        ))}

        {showQuickActions && (
          <div className={styles.quickActions}>
            {QUICK_ACTIONS.map((qa) => (
              <button key={qa.label} className={styles.qaChip} onClick={() => sendMessage(qa.prompt)}>
                {qa.label}
              </button>
            ))}
          </div>
        )}

        {loading && (
          <div className={styles.msgRow}>
            <div className={`${styles.avatar} ${styles.aiAv}`}>AI</div>
            <div className={`${styles.bubble} ${styles.aiB}`}>
              <div className={styles.typing}>
                <span /><span /><span />
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className={styles.inputBar}>
        <div className={styles.inputInner}>
          <div className={styles.textareaWrap}>
            <textarea
              ref={textareaRef}
              id="chat-input"
              rows={1}
              placeholder="Ask about cost, buildability, materials, construction..."
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                e.target.style.height = 'auto';
                e.target.style.height = `${Math.min(e.target.scrollHeight, 100)}px`;
              }}
              onKeyDown={handleKeyDown}
            />
          </div>
          <button
            id="send-btn"
            className={styles.sendBtn}
            onClick={() => sendMessage()}
            disabled={loading || !input.trim()}
            aria-label="Send message"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
        <p className={styles.footerHint}>
          All 23 calculators are free. Full BOQ available on WhatsApp. Agnaa AI provides planning estimates only.
        </p>
      </div>
    </div>
  );
}
