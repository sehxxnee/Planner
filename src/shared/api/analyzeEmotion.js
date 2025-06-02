export async function analyzeEmotion(text) {
  const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
  const prompt = `\n다음 일기 내용을 읽고 감정을 한글 이모지(😊, 😢, 😡, 😱, 😍, 😐)로 한 글자만 반환해줘.\n일기: \"\"\"${text}\"\"\"\n감정 이모지:`;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: '너는 감정 분석가야.' },
        { role: 'user', content: prompt }
      ],
      max_tokens: 5,
      temperature: 0.2,
    }),
  });

  const data = await response.json();
  const emotion = data.choices?.[0]?.message?.content?.trim() || '😐';
  return emotion;
} 