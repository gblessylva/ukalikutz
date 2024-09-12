import React, { useState, useEffect } from '@wordpress/element';
import { Button, Icon, Notice } from '@wordpress/components';
import '../admin/styles/CalendarStyles.css'
import {chevronLeft, chevronRight } from '@wordpress/icons';
import { ClientsComboBox } from '../general/ClientsComboBox';
import renderMonthView from './views/monthView';
import renderWeekView from './views/weekView';
import renderYearView from './views/yearView';
import { useFetchAppointments } from '../../hooks/use-fetch-appointments';

// const { appointments, loading, error } = useFetchAppointments();

// const {  errorMessage, successMessage, loading } = useSaveAppointment();


// import apiFetch from '@wordpress/api-fetch';

// const useFetchAppointments = () => {
//     const [appointments, setAppointments] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchAppointments = async () => {
//             try {
//                 const response = await apiFetch({ path: '/ukalikutz/v1/appointments' });
//                 console.log('appointment', response);
//                 setAppointments(response);
//             } catch (err) {
//                 setError(err);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchAppointments();
//     }, []);

//     return { appointments, loading, error };
// };


const SAMPLE_EVENTS = [
    { id: 1, title: 'Team Meeting', date: '2024-08-15', time: '14:00', color: 'blue' },
    { id: 2, title: 'Project Deadline', date: '2024-08-20', time: '09:00', color: 'red' },
    { id: 3, title: 'Training Session', date: '2024-08-10', time: '11:30', color: 'green' },
    { id: 4, title: 'Client Call', date: '2024-08-18', time: '15:45', color: 'yellow' },
];




const CalendarScheduler = ({onSave}) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [events, setEvents] = useState(SAMPLE_EVENTS);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newEvent, setNewEvent] = useState({ title: '', date: '', time: '', color: 'blue' });
    const [view, setView] = useState('month');
    const [selectedClient, setSelectedClient] = useState(null);
    
    const { appointments, loading, error } = useFetchAppointments();

    const handlePrev = () => {
        switch (view) {
            case 'day':
                setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 1));
                break;
            case 'week':
                setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 7));
                break;
            case 'month':
                setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
                break;
            case 'year':
                setCurrentDate(new Date(currentDate.getFullYear() - 1, 0, 1));
                break;
        }
    };

    const handleNext = () => {
        switch (view) {
            case 'day':
                setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1));
                break;
            case 'week':
                setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 7));
                break;
            case 'month':
                setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
                break;
            case 'year':
                setCurrentDate(new Date(currentDate.getFullYear() + 1, 0, 1));
                break;
        }
    };

    const handleDateClick = (date) => {
        setNewEvent({ ...newEvent, date });
        setIsModalOpen(true);
    };

    const handleSaveAppointment = () => {

        if (newEvent.title && newEvent.date && newEvent.time) {
            setEvents([...events, { ...newEvent, id: events.length + 1 }]);
            setNewEvent({ title: '', date: '', time: '', color: 'blue' });
            setIsModalOpen(false);
            const appointmentDate = newEvent.date;

            onSave({
                selectedClient,
                appointmentDate,
                // selectedStylist,
            });
        }
    };

    const getEventsForDate = (date) => {
        return appointments.filter(appointment => appointment.date === date);
    };

    const renderDayView = () => {
        const dateStr = currentDate.toISOString().split('T')[0];
        const dayEvents = getEventsForDate(dateStr);
        const hours = Array.from({ length: 24 }, (_, i) => i);

        return (
            <div className="day-view">
                {hours.map(hour => {
                    const timeStr = `${hour.toString().padStart(2, '0')}:00`;
                    const eventForHour = dayEvents.find(event => event.time.startsWith(timeStr));
                    return (
                        <div key={hour} className="hour-slot">
                            <div className="time">{timeStr}</div>
                            {eventForHour && (
                                <div className={`event ${eventForHour.color}`}>
                                    {eventForHour.title}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        );
    };

 

   

    const renderView = () => {
        switch (view) {
            case 'day':
                return renderDayView();
            case 'week':
                return renderWeekView(currentDate, getEventsForDate);
            case 'month':
                return renderMonthView(currentDate, getEventsForDate, handleDateClick);
            case 'year':
                return renderYearView(currentDate, getEventsForDate);
            default:
                return null;
        }
    };

    const getViewTitle = () => {
        switch (view) {
            case 'day':
                return currentDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
            case 'week':
                const startOfWeek = new Date(currentDate);
                startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
                const endOfWeek = new Date(startOfWeek);
                endOfWeek.setDate(startOfWeek.getDate() + 6);
                return `${startOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${endOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
            case 'month':
                return currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
            case 'year':
                return currentDate.getFullYear().toString();
            default:
                return '';
        }
    };

    return (
        <div className="calendar-scheduler">
            <div className="header">
                <Button  label="Previous" onClick={handlePrev}>
                    <Icon className="icon" icon={chevronLeft} size={36} />
                </Button>
                <h2 className="title">{getViewTitle()}</h2>
                <Button  label="Next" onClick={handleNext}>
                    <Icon className="icon" icon={chevronRight} size={36} />
                </Button>

            </div>
            <div className="view-selector">
                {['day', 'week', 'month', 'year'].map(v => (
                    <button
                        key={v}
                        onClick={() => setView(v)}
                        className={`view-button ${view === v ? 'active' : ''}`}
                    >
                        {v.charAt(0).toUpperCase() + v.slice(1)}
                    </button>
                ))}
            </div>
            <div className="calendar-view">
                {renderView()}
            </div>

            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                    {/* {errorMessage && <Notice status="error" isDismissible={false}>{errorMessage}</Notice>}
                    {successMessage && <Notice status="success" isDismissible={false}>{successMessage}</Notice>} */}
                        <h2>Add New Event</h2>
                        <div className="form-group">
                            <label htmlFor="event-title">Title</label>
                            <input
                                id="event-title"
                                value={newEvent.title}
                                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="event-date">Date</label>
                            <input
                                id="event-date"
                                type="date"
                                value={newEvent.date}
                                onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="event-time">Time</label>
                            <input
                                id="event-time"
                                type="time"
                                value={newEvent.time}
                                onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="event-color">Color</label>
                            <select
                                id="event-color"
                                value={newEvent.color}
                                onChange={(e) => setNewEvent({ ...newEvent, color: e.target.value })}
                            >
                                <option value="blue">Blue</option>
                                <option value="red">Red</option>
                                <option value="green">Green</option>
                                <option value="yellow">Yellow</option>
                            </select>
                        </div>
                        <ClientsComboBox onSelect={(value) => setSelectedClient(value)} />
                        <div className="modal-actions">
                            <button onClick={handleSaveAppointment}>Add Event</button>
                            <button onClick={() => setIsModalOpen(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CalendarScheduler;