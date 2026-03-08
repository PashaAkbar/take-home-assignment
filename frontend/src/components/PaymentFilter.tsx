
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Props {
  onChange: (status?: string) => void;
}

export default function PaymentFilter({onChange}: Props) {
  return (
    <div className="flex justify-end" data-testid="payment-filter">
      <Select
        onValueChange={(value) => {
          if (value === 'all') {
            onChange(undefined);
          } else {
            onChange(value);
          }
        }}
      >
        <SelectTrigger className="w-45">
          <SelectValue placeholder="Filter status" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">All</SelectItem>

          <SelectItem value="completed">Completed</SelectItem>

          <SelectItem value="processing">Processing</SelectItem>

          <SelectItem value="failed">Failed</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
