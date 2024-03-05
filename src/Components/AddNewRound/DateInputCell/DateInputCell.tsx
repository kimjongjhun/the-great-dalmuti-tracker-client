import { TableCell } from "@mui/material";
import { Moment, MomentInput } from "moment";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

interface DateInputCellProps {
  dateInput: Moment;
  handleDateChange: (input: MomentInput) => void;
  disabled: boolean;
}

const DateInputCell = ({
  dateInput,
  handleDateChange,
  disabled,
}: DateInputCellProps) => {
  return (
    <TableCell align={"center"}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DatePicker
          value={dateInput}
          onChange={handleDateChange}
          disabled={disabled}
        />
      </LocalizationProvider>
    </TableCell>
  );
};

export default DateInputCell;
