
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');

if (!container) {
  throw new Error("Root element not found");
}

try {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} catch (error) {
  console.error("Failed to render the app:", error);
  container.innerHTML = `<div style="padding: 20px; color: red;">앱 로딩 중 오류가 발생했습니다. 콘솔을 확인해주세요.</div>`;
}
