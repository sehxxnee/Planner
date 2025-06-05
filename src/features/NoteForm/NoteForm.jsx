import React, { useState } from 'react';
import { analyzeEmotion } from '../../shared/api/analyzeEmotion';

export const NoteForm = ({ onSubmit, onCancel, initialData, initialDate }) => {
  const [text, setText] = useState(initialData?.text || '');
  const [date, setDate] = useState(initialDate || initialData?.date || new Date().toISOString().split('T')[0]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(initialData || null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!text.trim()) {
      alert('일기 내용을 입력해주세요.');
      return;
    }

    setIsAnalyzing(true);
    try {
      const result = await analyzeEmotion(text);
      setAnalysisResult(result);
      
      onSubmit({
        id: initialData?.id || Date.now(),
        text,
        date,
        ...result
      });
    } catch (error) {
      console.error('감정 분석 중 오류 발생:', error);
      alert('감정 분석 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: 'white',
        padding: '24px',
        borderRadius: '12px',
        width: '90%',
        maxWidth: '600px',
        maxHeight: '90vh',
        overflowY: 'auto'
      }}>
        <h2 style={{ marginBottom: '20px', color: '#333' }}>
          {initialData ? '노트 수정하기' : '새 노트 작성하기'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: '#666' }}>
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
                borderRadius: '4px'
              }}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: '#666' }}>
              내용
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              style={{
                width: '100%',
                height: '200px',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                resize: 'vertical'
              }}
              placeholder="오늘 하루는 어땠나요?"
            />
          </div>

          {isAnalyzing && (
            <div style={{ 
              marginBottom: '16px',
              color: '#666',
              fontSize: '14px',
              textAlign: 'center',
              padding: '20px',
              background: '#f8f9fa',
              borderRadius: '8px'
            }}>
              감정을 분석하고 있습니다...
            </div>
          )}

          {analysisResult && !isAnalyzing && (
            <div style={{ 
              marginBottom: '16px',
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
                <span style={{ fontSize: '24px' }}>{analysisResult.emotionEmoji}</span>
                <div>
                  <div style={{ 
                    fontSize: '16px', 
                    fontWeight: '600',
                    color: '#333'
                  }}>
                    {analysisResult.emotion}
                  </div>
                  <div style={{ 
                    fontSize: '14px',
                    color: '#666'
                  }}>
                    {analysisResult.sentiment}
                  </div>
                </div>
              </div>

              {analysisResult.keywords && analysisResult.keywords.length > 0 && (
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
                    {analysisResult.keywords.map((keyword, index) => (
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

              {analysisResult.advice && (
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
                    {analysisResult.advice}
                  </div>
                </div>
              )}

              {analysisResult.recommendedActivities && analysisResult.recommendedActivities.length > 0 && (
                <div style={{ marginTop: '12px' }}>
                  <div style={{ 
                    fontSize: '14px',
                    color: '#666',
                    marginBottom: '8px'
                  }}>
                    추천 활동
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {analysisResult.recommendedActivities.map((activity, index) => (
                      <div key={index} style={{ 
                        background: 'white', 
                        padding: '12px', 
                        borderRadius: '8px',
                        border: '1px solid #e9ecef'
                      }}>
                        <div style={{ 
                          fontWeight: '600', 
                          color: '#333',
                          marginBottom: '4px'
                        }}>
                          {activity.title}
                        </div>
                        <div style={{ 
                          color: '#666',
                          fontSize: '14px',
                          marginBottom: '4px'
                        }}>
                          {activity.description}
                        </div>
                        <div style={{ 
                          color: '#4a90e2',
                          fontSize: '13px',
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
          )}

          <div style={{ 
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '12px'
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
              disabled={isAnalyzing}
              style={{
                padding: '8px 16px',
                border: 'none',
                borderRadius: '4px',
                background: isAnalyzing ? '#ccc' : '#4a90e2',
                color: 'white',
                cursor: isAnalyzing ? 'not-allowed' : 'pointer'
              }}
            >
              {isAnalyzing ? '분석 중...' : '저장'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}; 