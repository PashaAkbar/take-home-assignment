/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import {Badge} from '@/components/ui/badge';
import {Skeleton} from '@/components/ui/skeleton';

interface Props {
    payments: any[];
    loading: boolean;
}

export default function PaymentTable({payments, loading}: Props) {
   function statusBadge(status: string) {
     const baseClass =
       'inline-flex items-center justify-center px-3 py-1 text-xs font-medium rounded-md';

     if (status === 'completed')
       return (
         <Badge className={`${baseClass} bg-green-100 text-green-700`}>
           Completed
         </Badge>
       );

     if (status === 'processing')
       return (
         <Badge className={`${baseClass} bg-yellow-100 text-yellow-700`}>
           Processing
         </Badge>
       );

     if (status === 'failed')
       return (
         <Badge className={`${baseClass} bg-red-100 text-red-700`}>
           Failed
         </Badge>
       );

     return <Badge className={baseClass}>{status}</Badge>;
   }

  return (
    <Table data-testid="payment-table">
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Merchant</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {/* Loading Skeleton */}

        {loading &&
          [...Array(5)].map((_, i) => (
            <TableRow key={i}>
              <TableCell>
                <Skeleton className="h-4 w-10" />
              </TableCell>

              <TableCell>
                <Skeleton className="h-4 w-32" />
              </TableCell>

              <TableCell>
                <Skeleton className="h-4 w-24" />
              </TableCell>

              <TableCell>
                <Skeleton className="h-4 w-20" />
              </TableCell>

              <TableCell>
                <Skeleton className="h-4" />
              </TableCell>
            </TableRow>
          ))}

        {/* Empty State */}

        {!loading && payments.length === 0 && (
          <TableRow>
            <TableCell
              colSpan={5}
              className="text-center text-muted-foreground py-6"
            >
              No payments found
            </TableCell>
          </TableRow>
        )}

        {/* Data Rows */}

        {!loading &&
          payments.map((p: any) => (
            <TableRow key={p.id}>
              <TableCell>{p.id}</TableCell>

              <TableCell className="font-medium">{p.merchant}</TableCell>

              <TableCell>
                {new Date(p.created_at).toLocaleDateString()}
              </TableCell>

              <TableCell>Rp {Number(p.amount).toLocaleString()}</TableCell>

              <TableCell width={240}>{statusBadge(p.status)}</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
