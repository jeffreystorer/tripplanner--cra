import React, { StrictMode, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import { RecoilRoot } from 'recoil';
import App from './App';
import { Loading } from './components/common';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <RecoilRoot>
      <ErrorBoundary>
        <Suspense FallbackComponent={<Loading />}>
          <App />
        </Suspense>
      </ErrorBoundary>
    </RecoilRoot>
  </StrictMode>
);
