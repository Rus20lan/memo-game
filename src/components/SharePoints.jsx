import { mainButton, useSignal, shareURL } from '@telegram-apps/sdk-react';
import { useEffect, useState } from 'react';

const SharePoints = () => {
  const isVisible = useSignal(mainButton.isVisible);
  const [isClick, setIsClick] = useState(false);

  useEffect(() => {
    console.log('The mainButton is', isVisible ? 'visible' : 'invisible');
  }, [isVisible]);

  useEffect(() => {
    if (mainButton.setParams.isAvailable()) {
      mainButton.setParams({
        backgroundColor: '#aa1388',
        hasShineEffect: true,
        isEnabled: true,
        isVisible: true,
        text: 'Поделиться очками',
        textColor: '#ffffff',
      });
      mainButton.backgroundColor();
      mainButton.hasShineEffect();
      mainButton.isEnabled();
      mainButton.text();
      mainButton.textColor();
    }
  }, [isVisible]);

  useEffect(() => {
    const handleClick = () => {
      try {
        // Получение текущих очков из localStorage
        const score = localStorage.getItem('memory-game-score') || 0;
        shareURL(`Посмотрите! У меня ${score} очков в игре!`);
        console.log('Окно выбора чата открыто для отправки сообщения.');
      } catch (error) {
        console.error('Ошибка при открытии окна выбора чата:', error);
      }
    };
    if (isClick) {
      mainButton.onClick(handleClick);
      setIsClick(false);
    }

    return () => {
      mainButton.offClick(handleClick);
      mainButton.unmount();
    };
  }, [isClick]);

  return (
    <button
      style={{ width: '100%', height: '40px' }}
      onClick={() => setIsClick(true)}
    >
      Click
    </button>
  );
};

export default SharePoints;
