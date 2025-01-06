import { mainButton, useSignal, shareURL } from '@telegram-apps/sdk-react';
import { useEffect } from 'react';

const SharePoints = () => {
  const isVisible = useSignal(mainButton.isVisible);

  useEffect(() => {
    if (isVisible && mainButton.isMounted) {
      mainButton.backgroundColor = '#aa1388';
      mainButton.text = 'Поделиться очками';
      mainButton.isEnabled = true;
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
    mainButton.mount();
    mainButton.onClick(handleClick);

    return () => {
      mainButton.unmount();
    };
  }, []);

  return null;
};

export default SharePoints;
