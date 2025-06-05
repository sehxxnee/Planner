import React, { useState } from 'react';
import { useNoteContext } from '../../shared/context/NoteContext';
import { useEventContext } from '../../shared/context/EventContext';

export const CalendarPage = () => {
  const { notes } = useNoteContext();
  const { events, toggleEventComplete } = useEventContext();
  const [selectedDate, setSelectedDate] = useState(null);
  const [showDayModal, setShowDayModal] = useState(false);
  const todayStr = new Date().toISOString().slice(0, 10);
  const [currentMonth, setCurrentMonth] = useState(new Date(todayStr + 'T12:00:00'));

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    
    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i, 12, 0, 0));
    }
    
    return days;
  };

  const getNotesForDate = (date) => {
    return notes.filter(note => note.date === date.toISOString().split('T')[0]);
  };

  const getEventsForDate = (date) => {
    return events.filter(event => event.date === date.toISOString().split('T')[0]);
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setShowDayModal(true);
  };

  const handleCloseModal = () => {
    setShowDayModal(false);
  };

  const days = getDaysInMonth(currentMonth);
  const monthNames = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
  const dayNames = ['일', '월', '화', '수', '목', '금', '토'];

  const DayModal = ({ date, onClose }) => {
    const dayNotes = getNotesForDate(date);
    const dayEvents = getEventsForDate(date);
    const hasNote = dayNotes.length > 0;
    const hasEvent = dayEvents.length > 0;

    const handleEventToggle = (eventId) => {
      toggleEventComplete(eventId);
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
          maxWidth: '600px',
          maxHeight: '90vh',
          overflowY: 'auto'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px'
          }}>
            <h2 style={{ margin: 0, color: '#333' }}>
              {date.getFullYear()}년 {monthNames[date.getMonth()]} {date.getDate()}일
            </h2>
            <button
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '24px',
                cursor: 'pointer',
                color: '#666'
              }}
            >
              ×
            </button>
          </div>

          {hasEvent && (
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ marginBottom: '10px', color: '#333' }}>일정</h3>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}>
                {dayEvents.map(event => (
                  <div
                    key={event.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px',
                      background: 'white',
                      borderRadius: '4px',
                      border: '1px solid #e9ecef'
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={event.completed}
                      onChange={() => handleEventToggle(event.id)}
                      style={{
                        width: '16px',
                        height: '16px',
                        cursor: 'pointer'
                      }}
                    />
                    <span style={{
                      flex: 1,
                      textDecoration: event.completed ? 'line-through' : 'none',
                      color: event.completed ? '#999' : '#333'
                    }}>
                      {event.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {hasNote && (
            <div>
              <h3 style={{ marginBottom: '10px', color: '#333' }}>일기</h3>
              {dayNotes.map(note => (
                <div key={note.id} style={{
                  marginBottom: '20px',
                  padding: '16px',
                  background: '#f8f9fa',
                  borderRadius: '8px'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '12px'
                  }}>
                    <span style={{ fontSize: '24px' }}>{note.emotionEmoji}</span>
                    <div>
                      <div style={{
                        fontSize: '16px',
                        fontWeight: '600',
                        color: '#333'
                      }}>
                        {note.emotion}
                      </div>
                      <div style={{
                        fontSize: '14px',
                        color: '#666'
                      }}>
                        {note.sentiment}
                      </div>
                    </div>
                  </div>

                  <div style={{
                    marginBottom: '16px',
                    padding: '12px',
                    background: 'white',
                    borderRadius: '8px',
                    border: '1px solid #e9ecef'
                  }}>
                    <div style={{
                      fontSize: '14px',
                      color: '#666',
                      marginBottom: '8px'
                    }}>
                      일기 내용
                    </div>
                    <div style={{
                      color: '#333',
                      fontSize: '15px',
                      lineHeight: 1.5,
                      whiteSpace: 'pre-wrap'
                    }}>
                      {note.text}
                    </div>
                  </div>

                  {note.keywords && note.keywords.length > 0 && (
                    <div style={{ marginBottom: '12px' }}>
                      <div style={{
                        fontSize: '14px',
                        color: '#666',
                        marginBottom: '8px'
                      }}>
                        주요 키워드
                      </div>
                      <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '8px'
                      }}>
                        {note.keywords.map((keyword, index) => (
                          <span key={index} style={{
                            padding: '4px 8px',
                            background: '#e3eafc',
                            color: '#4a90e2',
                            borderRadius: '12px',
                            fontSize: '13px'
                          }}>
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {note.advice && (
                    <div style={{
                      marginTop: '12px',
                      padding: '12px',
                      background: 'white',
                      borderRadius: '8px',
                      borderLeft: '4px solid #4a90e2'
                    }}>
                      <div style={{
                        fontSize: '14px',
                        color: '#666',
                        marginBottom: '8px'
                      }}>
                        조언
                      </div>
                      <div style={{
                        color: '#333',
                        fontSize: '15px',
                        lineHeight: 1.5
                      }}>
                        {note.advice}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {!hasNote && !hasEvent && (
            <div style={{
              textAlign: 'center',
              padding: '40px 20px',
              color: '#666'
            }}>
              <p style={{ marginBottom: '20px' }}>이 날의 기록이 없습니다.</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <h2 style={{ margin: 0 }}>
          {currentMonth.getFullYear()}년 {monthNames[currentMonth.getMonth()]}
        </h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
            style={{
              padding: '8px 16px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              background: 'white',
              cursor: 'pointer'
            }}
          >
            이전 달
          </button>
          <button
            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
            style={{
              padding: '8px 16px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              background: 'white',
              cursor: 'pointer'
            }}
          >
            다음 달
          </button>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: '1px',
        background: '#e9ecef',
        border: '1px solid #e9ecef',
        borderRadius: '8px',
        overflow: 'hidden'
      }}>
        {dayNames.map(day => (
          <div
            key={day}
            style={{
              padding: '10px',
              textAlign: 'center',
              background: 'white',
              fontWeight: 'bold',
              fontSize: 'clamp(12px, 2vw, 16px)',
              color: day === '일' ? '#ff4444' : day === '토' ? '#4a90e2' : '#333'
            }}
          >
            {day}
          </div>
        ))}
        {days.map((date, index) => {
          if (!date) {
            return <div key={index} style={{ background: 'white', minHeight: '100px' }} />;
          }

          const dayNotes = getNotesForDate(date);
          const dayEvents = getEventsForDate(date);
          const hasContent = dayNotes.length > 0 || dayEvents.length > 0;

          return (
            <div
              key={index}
              onClick={() => handleDateClick(date)}
              style={{
                padding: '8px',
                background: 'white',
                minHeight: '100px',
                cursor: 'pointer',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                fontSize: 'clamp(12px, 2vw, 14px)',
                color: date.getDay() === 0 ? '#ff4444' : date.getDay() === 6 ? '#4a90e2' : '#333'
              }}
            >
              <div style={{
                fontSize: 'clamp(14px, 2.5vw, 16px)',
                fontWeight: 'bold',
                marginBottom: '4px'
              }}>
                {date.getDate()}
              </div>
              {hasContent && (
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '2px',
                  overflow: 'hidden'
                }}>
                  {dayNotes.map(note => (
                    <div key={note.id} style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '20px'
                    }}>
                      {note.emotionEmoji}
                    </div>
                  ))}
                  {dayEvents.length > 0 && (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '4px'
                    }}>
                      <div style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: '#4a90e2',
                        margin: '0 auto'
                      }} />
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {showDayModal && selectedDate && (
        <DayModal
          date={selectedDate}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}; 