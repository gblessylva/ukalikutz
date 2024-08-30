import React, { useState } from 'react';
import { Button, Modal, TextControl, SelectControl, Icon } from '@wordpress/components';
// import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';

const SAMPLE_EVENTS = [
  { id: 1, title: 'Team Meeting', date: '2024-08-15', time: '14:00', color: 'bg-blue-200' },
  { id: 2, title: 'Project Deadline', date: '2024-08-20', time: '09:00', color: 'bg-red-200' },
  { id: 3, title: 'Training Session', date: '2024-08-10', time: '11:30', color: 'bg-green-200' },
  { id: 4, title: 'Client Call', date: '2024-08-18', time: '15:45', color: 'bg-yellow-200' },
];

const CalendarScheduler = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState(SAMPLE_EVENTS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: '', date: '', time: '', color: 'bg-blue-200' });

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleDateClick = (date) => {
    setNewEvent({ ...newEvent, date });
    setIsModalOpen(true);
  };

  const handleAddEvent = () => {
    if (newEvent.title && newEvent.date && newEvent.time) {
      setEvents([...events, { ...newEvent, id: events.length + 1 }]);
      setNewEvent({ title: '', date: '', time: '', color: 'bg-blue-200' });
      setIsModalOpen(false);
    }
  };

  const getEventsForDate = (date) => {
    return events.filter(event => event.date === date);
  };

  const renderCalendar = () => {
    const calendar = [];
    let day = 1;

    for (let i = 0; i < 6; i++) {
      const week = [];
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDayOfMonth) {
          week.push(<td key={`empty-${j}`} className="border p-2"></td>);
        } else if (day > daysInMonth) {
          week.push(<td key={`empty-end-${j}`} className="border p-2"></td>);
        } else {
          const date = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          const dayEvents = getEventsForDate(date);
          week.push(
            <td 
              key={day} 
              className="border p-2 h-32 align-top cursor-pointer hover:bg-gray-100"
              onClick={() => handleDateClick(date)}
            >
              <div className="font-bold mb-1">{day}</div>
              {dayEvents.map(event => (
                <div key={event.id} className={`${event.color} p-1 mb-1 rounded text-sm truncate flex items-center`}>
                  <Icon icon={'calendar'} size={36} />
                  <span>{event.time}</span>
                  <span className="ml-1">{event.title}</span>
                </div>
              ))}
            </td>
          );
          day++;
        }
      }
      calendar.push(<tr key={i}>{week}</tr>);
      if (day > daysInMonth) break;
    }

    return calendar;
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 bg-white rounded-xl shadow-md overflow-hidden">
      <div className="flex justify-between items-center bg-blue-500 text-white p-4">
        <button onClick={handlePrevMonth} className="p-1">
        <Icon icon={'check'} size={36} />
        </button>
        <h2 className="text-xl font-bold">
          {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h2>
        <button onClick={handleNextMonth} className="p-1">
        <Icon icon={'check'} size={36} />
        </button>
      </div>
      <div className="p-4">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <th key={day} className="border p-2">{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {renderCalendar()}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <Modal
          title="Add New Event"
          onRequestClose={() => setIsModalOpen(false)}
          isDismissible={true}
        >
          <div className="grid gap-4 py-4">
            <TextControl
              label="Title"
              value={newEvent.title}
              onChange={(value) => setNewEvent({ ...newEvent, title: value })}
            />
            <TextControl
              label="Date"
              type="date"
              value={newEvent.date}
              onChange={(value) => setNewEvent({ ...newEvent, date: value })}
            />
            <TextControl
              label="Time"
              type="time"
              value={newEvent.time}
              onChange={(value) => setNewEvent({ ...newEvent, time: value })}
            />
            <SelectControl
              label="Color"
              value={newEvent.color}
              options={[
                { label: 'Blue', value: 'bg-blue-200' },
                { label: 'Red', value: 'bg-red-200' },
                { label: 'Green', value: 'bg-green-200' },
                { label: 'Yellow', value: 'bg-yellow-200' },
              ]}
              onChange={(value) => setNewEvent({ ...newEvent, color: value })}
            />
          </div>
          <Button isPrimary onClick={handleAddEvent}>
            Add Event
          </Button>
        </Modal>
      )}
    </div>
  );
};

export default CalendarScheduler;
