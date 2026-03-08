/* eslint-disable @typescript-eslint/no-explicit-any */

import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {fetchPayments} from '@/features/payments/paymentsSlice';

import SummaryCards from '@/components/SummaryCards';
import PaymentTable from '@/components/PaymentTable';

import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';

import { useNavigate } from 'react-router-dom';
import { logout } from '@/features/auth/authSlice';
import { Button } from '@/components/ui/button';
import PaymentFilter from '@/components/PaymentFilter';

export default function DashboardPage() {
  const dispatch = useDispatch();
const {data: payments, loading} = useSelector((state: any) => state.payments);

  const [status, setStatus] = useState<string | undefined>();

  useEffect(() => {
    dispatch(fetchPayments(status) as any);
  }, [dispatch, status]);

  const navigate = useNavigate();

  function handleLogout() {
    dispatch(logout());

    navigate('/login');
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}

      <div className="flex justify-between ">
        <div>
          <h1 className="text-3xl font-bold">Payments Dashboard</h1>

          <p className="text-muted-foreground">Monitor incoming payments</p>
        </div>

        <Button onClick={handleLogout}>Logout</Button>
      </div>

      {/* Summary */}

      <SummaryCards payments={payments || []} loading={loading} />
      <PaymentFilter
        onChange={(value) => {
          setStatus(value);
        }}
      />
      {/* Table */}

      <Card>
        <CardHeader>
          <CardTitle>Payment List</CardTitle>
        </CardHeader>

        <CardContent>
          <PaymentTable payments={payments} loading={loading} />
        </CardContent>
      </Card>
    </div>
  );
}
