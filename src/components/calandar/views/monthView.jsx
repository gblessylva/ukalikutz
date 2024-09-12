const renderMonthView = (currentDate, getEventsForDate, handleDateClick) => {
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const calendar = [];

    let week = Array(7).fill(null);
    for (let i = 0; i < firstDayOfMonth; i++) {
        week[i] = null;
    }

    days.forEach((day, index) => {
        const dayIndex = (firstDayOfMonth + index) % 7;
        week[dayIndex] = day;
        if (dayIndex === 6 || index === days.length - 1) {
            calendar.push(week);
            week = Array(7).fill(null);
        }
    });

    return (
        <table className="month-view">
            <thead>
                <tr>
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <th key={day}>{day}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {calendar.map((week, weekIndex) => (
                    <tr key={weekIndex}>
                        {week.map((day, dayIndex) => {
                            if (day === null) return <td key={dayIndex}></td>;
                            const date = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                            const dayEvents = getEventsForDate(date);
                            return (
                                <td key={dayIndex} onClick={() => handleDateClick(date)}>
                                    <div className="day-number">{day}</div>
                                    {dayEvents.map(event => (
                                        <div key={event.id} className={`event ${event.color}`}>
                                            <span className="event-time">{event.time}</span>
                                            <span className="event-title">{event.title}</span>
                                        </div>
                                    ))}
                                </td>
                            );
                        })}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
export default renderMonthView;