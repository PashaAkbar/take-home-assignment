/* eslint-disable @typescript-eslint/no-explicit-any */
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {describe, it, expect, vi, beforeEach} from 'vitest';

import DashboardPage from '..';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';

import paymentsReducer from '@/features/payments/paymentsSlice';
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

vi.mock('@/features/payments/paymentsSlice', async () => {
  const actual = await vi.importActual<any>(
    '@/features/payments/paymentsSlice',
  );

  return {
    ...actual,
    fetchPayments: vi.fn(() => ({type: 'payments/fetch'})),
  };
});

function renderWithProviders() {
  const store = configureStore({
    reducer: {
      payments: paymentsReducer,
      auth: authReducer,
    },
    preloadedState: {
      payments: {
        data: [],
        loading: false,
      },
    },
  });

  return render(
    <Provider store={store}>
      <BrowserRouter>
        <DashboardPage />
      </BrowserRouter>
    </Provider>,
  );
}

describe('DashboardPage', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('renders dashboard page', () => {
    renderWithProviders();

    expect(screen.getByText(/payments dashboard/i)).toBeInTheDocument();
  });

  it('renders payment list section', () => {
    renderWithProviders();

    expect(screen.getByText(/payment list/i)).toBeInTheDocument();
  });

  it('logout navigates to login page', async () => {
    renderWithProviders();

    const logoutButton = screen.getByRole('button', {name: /logout/i});

    await userEvent.click(logoutButton);

    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });
});
