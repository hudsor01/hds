// components/dashboard/calendar-widget.tsx
import Badge from '@mui/material/Badge';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Tooltip from '@mui/material/Tooltip';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { isSameDay } from 'date-fns';
import { useState } from 'react';

interface CalendarEvent {
  id: string;
  date: Date;
  type: 'payment' | 'maintenance' | 'lease';
  title: string;
  description: string;
}

export function CalendarWidget() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  // Mock events - would come from your API
  const events: CalendarEvent[] = [
    {
      id: '1',
      date: new Date(),
      type: 'payment',
      title: 'Rent Due',
      description: '5 properties have rent due',
    },
    {
      id: '2',
      date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      type: 'maintenance',
      title: 'Scheduled Maintenance',
      description: 'HVAC inspection at 123 Main St',
    },
    {
      id: '3',
      date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      type: 'lease',
      title: 'Lease Expiring',
      description: 'Lease expires for 456 Oak Ave',
    },
  ];

  const getDayProps = (day: Date) => {
    const dayEvents = events.filter((event) => isSameDay(event.date, day));

    if (dayEvents.length === 0) return {};

    return {
      renderDay: (day: Date) => (
        <Tooltip
          title={dayEvents.map((event) => (
            <div key={event.id}>
              <strong>{event.title}</strong>
              <br />
              {event.description}
            </div>
          ))}
        >
          <Badge color="primary" variant="dot" overlap="circular">
            {day.getDate()}
          </Badge>
        </Tooltip>
      ),
    };
  };

  return (
    <Card>
      <CardHeader title="Calendar" />
      <CardContent>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateCalendar
            value={selectedDate}
            onChange={(newDate) => setSelectedDate(newDate)}
            slots={{
              day: (props) => {
                const dayProps = getDayProps(props.day);
                return dayProps.renderDay
                  ? dayProps.renderDay(props.day)
                  : props.children;
              },
            }}
          />
        </LocalizationProvider>
      </CardContent>
    </Card>
  );
}
