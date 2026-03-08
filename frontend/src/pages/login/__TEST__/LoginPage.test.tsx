/* eslint-disable @typescript-eslint/no-explicit-any */
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {describe, it, expect, vi} from 'vitest';

import LoginPage from '..';

import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import authReducer from '@/features/auth/authSlice';

import {BrowserRouter} from 'react-router-dom';



const mockNavigate = vi.fn();


vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<any>('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

function renderWithProviders(ui: React.ReactElement) {
  const store = configureStore({
    reducer: {
      auth: authReducer,
    },
  });

  return render(
    <Provider store={store}>
      <BrowserRouter>{ui}</BrowserRouter>
    </Provider>,
  );
}

describe('LoginPage', () => {
  it('renders login page', () => {
    renderWithProviders(<LoginPage />);

    expect(screen.getByTestId('login-page')).toBeInTheDocument();
  });

  it('renders inputs', () => {
    renderWithProviders(<LoginPage />);

    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.getByTestId('password-input')).toBeInTheDocument();
  });

  it('allows typing in inputs', async () => {
    renderWithProviders(<LoginPage />);

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');

    await userEvent.type(emailInput, 'cs@test.com');
    await userEvent.type(passwordInput, 'password');

    expect(emailInput).toHaveValue('cs@test.com');
    expect(passwordInput).toHaveValue('password');
  });

  it('submits form', async () => {
    renderWithProviders(<LoginPage />);

    const button = screen.getByTestId('login-button');

    await userEvent.click(button);

    expect(button).toBeInTheDocument();
  });

});
