import React, { useState } from 'react';
import { useNoteContext } from '../../shared/context/NoteContext';
import { NoteForm } from '../../features/NoteForm/NoteForm';

const EmotionCard = ({ note }) => {
  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case '긍정': return '#4CAF50';
      case '부정': return '#F44336';
      default: return '#9E9E9E';
    }
  };

  const getIntensityColor = (intensity) => {
    if (intensity >= 80) return '#F44336';
    if (intensity >= 60) return '#FF9800';
    if (intensity >= 40) return '#FFC107';
    if (intensity >= 20) return '#4CAF50';
    return '#9E9E9E';
  };

  return (
    <div style={{ 
      background: '#f8f9fa', 
      padding: 20, 
      borderRadius: 12, 
      marginTop: 16,
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
    }}>
      {/* 감정 요약 */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 12, 
        marginBottom: 16,
        padding: '12px 16px',
        background: 'white',
        borderRadius: 8,
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
      }}>
        <span style={{ fontSize: 32 }}>{note.emotionEmoji}</span>
        <div>
          <div style={{ 
            fontSize: 18, 
            fontWeight: 600, 
            color: '#333',
            marginBottom: 4
          }}>
            {note.emotion}
          </div>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 8 
          }}>
            <div style={{ 
              padding: '4px 8px', 
              background: getIntensityColor(note.intensity),
              color: 'white',
              borderRadius: 4,
              fontSize: 13
            }}>
              강도: {note.intensity}%
            </div>
            <div style={{ 
              padding: '4px 8px', 
              background: getSentimentColor(note.sentiment),
              color: 'white',
              borderRadius: 4,
              fontSize: 13
            }}>
              {note.sentiment}
            </div>
          </div>
        </div>
      </div>

      {/* 키워드 */}
      {note.keywords && note.keywords.length > 0 && (
        <div style={{ marginBottom: 16 }}>
          <div style={{ 
            fontSize: 14, 
            color: '#666', 
            marginBottom: 8,
            fontWeight: 500
          }}>
            주요 키워드
          </div>
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: 8 
          }}>
            {note.keywords.map((keyword, index) => (
              <span key={index} style={{
                padding: '6px 12px',
                background: '#e3eafc',
                color: '#4a90e2',
                borderRadius: 16,
                fontSize: 13
              }}>
                {keyword}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* 조언 */}
      {note.advice && (
        <div style={{ 
          marginBottom: 16,
          padding: '12px 16px',
          background: 'white',
          borderRadius: 8,
          borderLeft: '4px solid #4a90e2'
        }}>
          <div style={{ 
            fontSize: 14, 
            color: '#666', 
            marginBottom: 8,
            fontWeight: 500
          }}>
            조언
          </div>
          <div style={{ 
            color: '#333',
            fontSize: 15,
            lineHeight: 1.5
          }}>
            {note.advice}
          </div>
        </div>
      )}

      {/* 추천 활동 */}
      {note.recommendedActivities && note.recommendedActivities.length > 0 && (
        <div>
          <div style={{ 
            fontSize: 14, 
            color: '#666', 
            marginBottom: 12,
            fontWeight: 500
          }}>
            추천 활동
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {note.recommendedActivities.map((activity, index) => (
              <div key={index} style={{ 
                background: 'white', 
                padding: 16, 
                borderRadius: 8,
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                border: '1px solid #e9ecef'
              }}>
                <div style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  marginBottom: 8
                }}>
                  <span style={{ 
                    width: 24, 
                    height: 24, 
                    background: '#4a90e2',
                    color: 'white',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 14,
                    fontWeight: 600
                  }}>
                    {index + 1}
                  </span>
                  <div style={{ 
                    fontWeight: 600, 
                    color: '#333',
                    fontSize: 15
                  }}>
                    {activity.title}
                  </div>
                </div>
                <div style={{ 
                  color: '#666',
                  fontSize: 14,
                  marginBottom: 8,
                  paddingLeft: 32
                }}>
                  {activity.description}
                </div>
                <div style={{ 
                  color: '#4a90e2',
                  fontSize: 13,
                  paddingLeft: 32,
                  fontStyle: 'italic'
                }}>
                  {activity.benefit}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export const NotePage = () => {
  const { notes, addNote, deleteNote } = useNoteContext();
  const [showForm, setShowForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [editNote, setEditNote] = useState(null);

  const openForm = (date = '', note = null) => {
    setSelectedDate(date);
    setEditNote(note);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditNote(null);
    setSelectedDate('');
  };

  return (
    <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      {notes.length === 0 && !showForm && (
        <div style={{ textAlign: 'center' }}>
          <img src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80" alt="No Note" style={{ width: 220, marginBottom: 24, borderRadius: 16 }} />
          <h2 style={{ color: '#444', marginBottom: 8 }}>아직 노트가 없어요.</h2>
          <button onClick={() => openForm()} style={{ background: '#4a90e2', color: 'white', border: 'none', borderRadius: 24, padding: '12px 32px', fontSize: 16, cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' , marginTop: 18}}>+ 노트 추가</button>
        </div>
      )}
      {notes.length > 0 && !showForm && (
        <div style={{ width: '100%', maxWidth: 600, margin: '40px auto 0' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
            <button onClick={() => openForm()} style={{ background: '#4a90e2', color: 'white', border: 'none', borderRadius: 24, padding: '10px 24px', fontSize: 15, cursor: 'pointer' }}>+ 노트 추가</button>
          </div>
          {notes.map(note => (
            <div key={note.id} style={{ 
              background: 'white', 
              borderRadius: 16, 
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)', 
              padding: 24, 
              marginBottom: 20, 
              position: 'relative' 
            }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                marginBottom: 16 
              }}>
                <div style={{ 
                  fontSize: 18, 
                  fontWeight: 600,
                  color: '#333'
                }}>
                  {note.date}
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button 
                    onClick={() => openForm('', note)}
                    style={{ 
                      background: 'none', 
                      border: 'none', 
                      color: '#4a90e2', 
                      cursor: 'pointer',
                      fontSize: 14,
                      padding: '4px 8px',
                      borderRadius: 4
                    }}
                  >
                    수정
                  </button>
                  <button 
                    onClick={() => deleteNote(note.id)}
                    style={{ 
                      background: 'none', 
                      border: 'none', 
                      color: '#ff4444', 
                      cursor: 'pointer',
                      fontSize: 14,
                      padding: '4px 8px',
                      borderRadius: 4
                    }}
                  >
                    삭제
                  </button>
                </div>
              </div>
              <div style={{ 
                color: '#555', 
                marginBottom: 16, 
                whiteSpace: 'pre-wrap',
                lineHeight: 1.6,
                fontSize: 15
              }}>
                {note.text}
              </div>
              
              {note.emotion && <EmotionCard note={note} />}
            </div>
          ))}
        </div>
      )}
      {showForm && (
        <NoteForm
          onSubmit={note => { addNote(note); closeForm(); }}
          onCancel={closeForm}
          initialData={editNote}
          initialDate={selectedDate}
        />
      )}
    </div>
  );
}; 