import React, { useState } from 'react';

export const EventForm = ({ onSubmit, onCancel, initialDate }) => {
  const [text, setText] = useState('');
  const [date, setDate] = useState(() => {
    if (initialDate) {
      return initialDate.split('T')[0];
    }
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    onSubmit({
      text: text.trim(),
      date,
      completed: false
    });

    setText('');
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: 'white',
        padding: '24px',
        borderRadius: '12px',
        width: '100%',
        maxWidth: '500px'
      }}>
        <h2 style={{ margin: '0 0 20px 0', color: '#333' }}>일정 추가</h2>
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: '#666'
            }}>
              날짜
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '14px'
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: '#666'
            }}>
              일정 내용
            </label>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="일정을 입력하세요"
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '14px'
              }}
            />
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '10px'
          }}>
            <button
              type="button"
              onClick={onCancel}
              style={{
                padding: '8px 16px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                background: 'white',
                cursor: 'pointer'
              }}
            >
              취소
            </button>
            <button
              type="submit"
              style={{
                padding: '8px 16px',
                background: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              추가
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}; 