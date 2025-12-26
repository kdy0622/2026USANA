
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const renderApp = () => {
  const container = document.getElementById('root');
  if (!container) return;

  try {
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (error) {
    console.error("Critical Render Error:", error);
    container.innerHTML = `
      <div style="padding: 40px; text-align: center; font-family: sans-serif;">
        <h2 style="color: #e11d48;">앱 실행 중 오류가 발생했습니다</h2>
        <p style="color: #64748b;">브라우저 캐시를 삭제하거나 페이지를 새로고침 해주세요.</p>
        <pre style="background: #f1f5f9; padding: 20px; border-radius: 8px; text-align: left; overflow: auto; display: inline-block;">${error instanceof Error ? error.message : String(error)}</pre>
      </div>
    `;
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderApp);
} else {
  renderApp();
}
