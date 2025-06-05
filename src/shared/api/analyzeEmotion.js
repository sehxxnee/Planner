const emotionEmojis = {
  '기쁨': '😊',
  '행복': '😄',
  '설렘': '🥰',
  '감사': '🙏',
  '평온': '😌',
  '희망': '✨',
  '자부심': '😎',
  '만족': '😌',
  '사랑': '❤️',
  '즐거움': '🎉',
  '슬픔': '😢',
  '우울': '😔',
  '불안': '😰',
  '걱정': '😟',
  '분노': '😠',
  '짜증': '😤',
  '실망': '😞',
  '후회': '😔',
  '외로움': '😢',
  '피로': '😫',
  '스트레스': '😓',
  '혼란': '😕',
  '두려움': '😨',
  '불안정': '😰',
  '무기력': '😑'
};

// 테스트용 목업 데이터
const mockAnalysisResult = {
  emotion: '기쁨',
  intensity: 85,
  sentiment: '긍정',
  keywords: ['성취', '보람', '행복'],
  advice: '오늘의 긍정적인 감정을 잘 간직하고, 앞으로도 이런 순간들을 만들어가세요.',
  recommendedActivities: [
    {
      title: '감사 일기 쓰기',
      description: '오늘 있었던 좋은 일들을 기록해보세요.',
      benefit: '긍정적인 감정을 더 오래 유지할 수 있습니다.'
    },
    {
      title: '가까운 사람과 공유하기',
      description: '오늘의 기쁜 마음을 가족이나 친구와 나누어보세요.',
      benefit: '행복이 배가됩니다.'
    }
  ]
};

// 응답에서 JSON 추출
const extractJsonFromResponse = (response) => {
  try {
    console.log('원본 응답:', response);

    // Puter.js 응답 구조에서 content 추출
    let content = response;
    if (response && response.message && response.message.content) {
      content = response.message.content;
    }
    console.log('추출된 content:', content);

    // 응답이 이미 JSON 객체인 경우
    if (typeof content === 'object') {
      return content;
    }
    
    // 응답이 문자열인 경우 JSON 부분 추출
    if (typeof content === 'string') {
      // JSON 형식의 문자열 찾기
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const jsonStr = jsonMatch[0];
        console.log('추출된 JSON 문자열:', jsonStr);
        return JSON.parse(jsonStr);
      }
    }
    
    // JSON 형식이 아닌 경우 기본 응답 생성
    console.log('JSON 형식이 아닌 응답, 기본값 사용');
    return {
      emotion: '평온',
      intensity: 50,
      sentiment: '중립',
      keywords: ['일상', '평화', '안정'],
      advice: '오늘 하루도 잘 마무리하세요.',
      recommendedActivities: [
        {
          title: '휴식하기',
          description: '충분한 휴식을 취하세요.',
          benefit: '내일을 위한 준비가 됩니다.'
        }
      ]
    };
  } catch (error) {
    console.error('JSON 파싱 오류:', error);
    return {
      emotion: '평온',
      intensity: 50,
      sentiment: '중립',
      keywords: ['일상', '평화', '안정'],
      advice: '오늘 하루도 잘 마무리하세요.',
      recommendedActivities: [
        {
          title: '휴식하기',
          description: '충분한 휴식을 취하세요.',
          benefit: '내일을 위한 준비가 됩니다.'
        }
      ]
    };
  }
};

// Puter.js 스크립트 로드
const loadPuterScript = () => {
  return new Promise((resolve, reject) => {
    if (window.puter) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://js.puter.com/v2/';
    script.onload = () => {
      // 스크립트 로드 후 약간의 지연을 주어 초기화 완료를 기다림
      setTimeout(() => {
        if (window.puter) {
          resolve();
        } else {
          reject(new Error('Puter.js 초기화 실패'));
        }
      }, 1000);
    };
    script.onerror = () => {
      reject(new Error('Puter.js 스크립트 로드 실패'));
    };
    document.body.appendChild(script);
  });
};

// Puter.js가 로드될 때까지 기다리는 함수
const waitForPuter = async () => {
  try {
    await loadPuterScript();
  } catch (error) {
    console.error('Puter.js 로드 실패:', error);
    throw error;
  }
};

export const analyzeEmotion = async (text) => {
  try {
    // Puter.js가 로드될 때까지 대기
    await waitForPuter();

    if (!window.puter) {
      throw new Error('Puter.js가 로드되지 않았습니다.');
    }

    const messages = [
      {
        role: 'system',
        content: `당신은 감정 분석 전문가입니다. 주어진 텍스트를 분석하여 다음 정보를 제공해주세요:
          1. 주요 감정 (한 단어로)
          2. 감정 강도 (0-100)
          3. 감정의 성향 (긍정/부정/중립)
          4. 주요 키워드 (3-5개)
          5. 조언 (한 문장)
          6. 추천 활동 (2-3개)
          
          응답은 반드시 다음 JSON 형식으로 해주세요:
          {
            "emotion": "감정",
            "intensity": 숫자,
            "sentiment": "긍정/부정/중립",
            "keywords": ["키워드1", "키워드2", ...],
            "advice": "조언",
            "recommendedActivities": [
              {
                "title": "활동 제목",
                "description": "활동 설명",
                "benefit": "기대 효과"
              }
            ]
          }

          반드시 JSON 형식으로만 응답해주세요. 다른 설명이나 텍스트는 포함하지 마세요.`
      },
      {
        role: 'user',
        content: text
      }
    ];

    console.log('Puter.js 요청 시작');
    const response = await window.puter.ai.chat(messages);
    console.log('Puter.js 응답 받음:', response);

    const result = extractJsonFromResponse(response);
    console.log('파싱된 결과:', result);

    result.emotionEmoji = emotionEmojis[result.emotion] || '😐';
    return result;
  } catch (error) {
    console.error('감정 분석 중 오류 발생:', error);
    throw error;
  }
}; 