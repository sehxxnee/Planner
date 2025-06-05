import React, { useState, useEffect } from 'react';
import { useNoteContext } from '../../shared/context/NoteContext';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const GraphPage = () => {
  const { notes } = useNoteContext();
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [chartType, setChartType] = useState('line');

  const months = [
    '1월', '2월', '3월', '4월', '5월', '6월',
    '7월', '8월', '9월', '10월', '11월', '12월'
  ];

  const years = Array.from(
    { length: 5 },
    (_, i) => new Date().getFullYear() - 2 + i
  );

  const getEmotionValue = (emotion) => {
    const emotionMap = {
      '😊': 5, '😄': 5, '😃': 5, '😁': 5, '😆': 5,
      '😅': 4, '😌': 4, '😉': 4, '🙂': 4,
      '😐': 3, '😑': 3, '😶': 3,
      '😕': 2, '😟': 2, '🙁': 2, '😔': 2,
      '😢': 1, '😭': 1, '😞': 1, '😣': 1, '😖': 1
    };
    return emotionMap[emotion] || 3;
  };

  const getEmotionData = () => {
    const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
    const labels = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const data = Array(daysInMonth).fill(null);

    notes.forEach(note => {
      const noteDate = new Date(note.date);
      if (
        noteDate.getMonth() === selectedMonth &&
        noteDate.getFullYear() === selectedYear
      ) {
        const day = noteDate.getDate() - 1;
        if (note.emotion) {
          data[day] = getEmotionValue(note.emotion);
        }
      }
    });

    return { labels, data };
  };

  const { labels, data } = getEmotionData();

  const chartData = {
    labels,
    datasets: [
      {
        label: '감정 변화',
        data,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: '감정 변화 그래프',
        font: {
          size: 16
        }
      },
    },
    scales: {
      y: {
        min: 0,
        max: 6,
        ticks: {
          stepSize: 1,
          callback: (value) => {
            const emotions = ['😢', '😕', '😐', '😌', '😊'];
            return emotions[value - 1] || '';
          }
        }
      }
    }
  };

  return (
    <div style={{
      padding: '20px',
      maxWidth: '1200px',
      margin: '0 auto',
      width: '100%',
      boxSizing: 'border-box'
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        marginBottom: '20px'
      }}>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px',
          alignItems: 'center'
        }}>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            style={{
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ddd',
              fontSize: '16px'
            }}
          >
            {years.map(year => (
              <option key={year} value={year}>{year}년</option>
            ))}
          </select>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(Number(e.target.value))}
            style={{
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ddd',
              fontSize: '16px'
            }}
          >
            {months.map((month, index) => (
              <option key={month} value={index}>{month}</option>
            ))}
          </select>
          <div style={{
            display: 'flex',
            gap: '10px',
            marginLeft: 'auto'
          }}>
            <button
              onClick={() => setChartType('line')}
              style={{
                padding: '8px 16px',
                background: chartType === 'line' ? '#4CAF50' : '#ddd',
                color: chartType === 'line' ? 'white' : '#333',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              선 그래프
            </button>
            <button
              onClick={() => setChartType('bar')}
              style={{
                padding: '8px 16px',
                background: chartType === 'bar' ? '#4CAF50' : '#ddd',
                color: chartType === 'bar' ? 'white' : '#333',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              막대 그래프
            </button>
          </div>
        </div>
      </div>

      <div style={{
        height: '400px',
        width: '100%',
        position: 'relative',
        background: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        {chartType === 'line' ? (
          <Line data={chartData} options={chartOptions} />
        ) : (
          <Bar data={chartData} options={chartOptions} />
        )}
      </div>

      <div style={{
        marginTop: '20px',
        padding: '20px',
        background: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ margin: '0 0 10px 0' }}>감정 범례</h3>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span>😊</span>
            <span>매우 좋음</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span>😌</span>
            <span>좋음</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span>😐</span>
            <span>보통</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span>😕</span>
            <span>나쁨</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span>😢</span>
            <span>매우 나쁨</span>
          </div>
        </div>
      </div>
    </div>
  );
}; 