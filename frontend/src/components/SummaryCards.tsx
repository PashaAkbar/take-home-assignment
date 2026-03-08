/* eslint-disable @typescript-eslint/no-explicit-any */

import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import { Skeleton } from './ui/skeleton';

interface Props {
  payments: any[];
    loading: boolean;
}

export default function SummaryCards({payments, loading}: Props) {
  const total = payments.length;

  const completed = payments.filter((p) => p.status === 'completed').length;
  const failed = payments.filter((p) => p.status === 'failed').length;
  const processing = payments.filter((p) => p.status === 'processing').length;

   if (loading) {
     return (
       <div
         className="grid grid-cols-1 md:grid-cols-4 gap-4"
         data-testid="summary-cards"
       >
         {[...Array(4)].map((_, i) => (
           <Card key={i}>
             <CardHeader>
               <Skeleton className="h-4 w-24" />
             </CardHeader>
             <CardContent>
               <Skeleton className="h-8 w-16" />
             </CardContent>
           </Card>
         ))}
       </div>
     );
   }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Total Payments</CardTitle>
        </CardHeader>
        <CardContent className="text-3xl font-bold">{total}</CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Completed</CardTitle>
        </CardHeader>
        <CardContent className="text-3xl font-bold text-green-600">
          {completed}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Processing</CardTitle>
        </CardHeader>
        <CardContent className="text-3xl font-bold text-yellow-600">
          {processing}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Failed</CardTitle>
        </CardHeader>
        <CardContent className="text-3xl font-bold text-red-600">
          {failed}
        </CardContent>
      </Card>
    </div>
  );
}
