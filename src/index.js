import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { mainButton, mockTelegramEnv, utils } from '@telegram-apps/sdk';
import { init, miniApp, backButton } from '@telegram-apps/sdk-react';

try {
  // Попытка инициализировать настоящее окружение Telegram
  init();
} catch (error) {
  // В случае ошибки инициализируем фейковое окружение
  mockTelegramEnv({
    themeParams: {
      accentTextColor: '#6ab2f2',
      bgColor: '#17212b',
      buttonColor: '#5288c1',
      buttonTextColor: '#ffffff',
      destructiveTextColor: '#ec3942',
      headerBgColor: '#17212b',
      hintColor: '#708499',
      linkColor: '#6ab3f3',
      secondaryBgColor: '#232e3c',
      sectionBgColor: '#17212b',
      sectionHeaderTextColor: '#6ab3f3',
      subtitleTextColor: '#708499',
      textColor: '#f5f5f5',
    },
    initData: {
      user: {
        id: 99281932,
        firstName: 'Andrew',
        lastName: 'Rogue',
        username: 'rogue',
        languageCode: 'en',
        isPremium: true,
        allowsWriteToPm: true,
      },
      hash: '89d6079ad6762351f38c6dbbc41bb53048019256a9443988af7a48bcad16ba31',
      authDate: new Date(1716922846000),
      signature: 'abc',
      startParam: 'debug',
      chatType: 'sender',
      chatInstance: '8428209589180549439',
    },
    initDataRaw: new URLSearchParams([
      [
        'user',
        JSON.stringify({
          id: 99281932,
          first_name: 'Andrew',
          last_name: 'Rogue',
          username: 'rogue',
          language_code: 'en',
          is_premium: true,
          allows_write_to_pm: true,
        }),
      ],
      [
        'hash',
        '89d6079ad6762351f38c6dbbc41bb53048019256a9443988af7a48bcad16ba31',
      ],
      ['auth_date', '1716922846'],
      ['start_param', 'debug'],
      ['signature', 'abc'],
      ['chat_type', 'sender'],
      ['chat_instance', '8428209589180549439'],
    ]).toString(),
    version: '7.2',
    platform: 'tdesktop',
  });

  init();
}
miniApp.mount();
miniApp.setHeaderColor('#aa1388');
backButton.mount();
mainButton.setParams({
  backgroundColor: '#aa1388',
  text: 'Поделиться очками',
  isVisible: true,
  isEnabled: true,
});
mainButton.mount();

mainButton.onClick(() => {
  try {
    // Получение текущих очков из localStorage
    const score = localStorage.getItem('memory-game-score') || 0;
    utils.shareURL(`Посмотрите! У меня ${score} очков в игре!`);
    console.log('Окно выбора чата открыто для отправки сообщения.');
  } catch (error) {
    console.error('Ошибка при открытии окна выбора чата:', error);
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
