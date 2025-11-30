console.log('Hello from client TypeScript!');

// 여기에 원하는 TypeScript 코드를 추가하세요
document.addEventListener('DOMContentLoaded', (): void => {
  console.log('DOM이 로드되었습니다!');

  // 예제: 타입 안전성
  const app: HTMLElement | null = document.getElementById('app');
  if (app) {
    console.log('App element found:', app);
  }
});
