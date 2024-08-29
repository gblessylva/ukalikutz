import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react';
import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from '@schedule-x/calendar';

import '@schedule-x/theme-default/dist/index.css';
import { useEffect, useState } from '@wordpress/element';

function CalendarApp() {
  const [events, setEvents] = useState([]);

  const datevents = [
    {
      id: 1,
      title: 'Coffee with John',
      start: '2025-08-29 10:05',
      end: '2025-08-29 10:35',
    },
  ];

  // Fetch appointments from the REST API endpoint
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch('/wp-json/ukalikutz/v1/appointments');
        const data = await response.json();

        // Transform the fetched data to match the events format
        const formattedEvents = data.map((appointment) => ({
          id: appointment.id.toString(),
          title: `Appointment with ${appointment.client}`,
          start: '2025-08-29 10:05', // This should be a combined date-time string
          end: '2025-08-29 10:35', // Adjust this if you have a separate end time
        }));

        setEvents(formattedEvents);
        
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []);
  console.log(events, 'new er');
  const calendar = useCalendarApp({
    views: [createViewDay(), createViewWeek(), createViewMonthGrid(), createViewMonthAgenda()],
    events: events, // Use the fetched and formatted events
  });

  calendar.setTheme('dark');

  return (
    <div>
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  );
}

export default CalendarApp;
