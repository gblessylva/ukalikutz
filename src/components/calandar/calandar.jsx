import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from '@schedule-x/calendar'
 
import '@schedule-x/theme-default/dist/index.css'
 
function CalendarApp() {
  const calendar = useCalendarApp({
    views: [createViewDay(), createViewWeek(), createViewMonthGrid(), createViewMonthAgenda()],
    events: [
      {
        id: '1',
        title: 'Event 1',
        start: '2024-08-19',
        end: '2024-08-19',
      },
      {
        id: 2,
        title: 'Coffee with John',
        start: '2024-08-19 10:05',
        end: '2024-08-19 10:35',
      },
    ],
  })
  calendar.setTheme('dark')
//  console.log(events);
  return (
    <div>
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  )
}
 
export default CalendarApp