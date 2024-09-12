const renderYearView = (currentDate, getEventsForDate) => {
    const months = Array.from({ length: 12 }, (_, i) => new Date(currentDate.getFullYear(), i, 1));

    return (
        <div className="year-view">
            {months.map((month, index) => (
                <div key={index} className="month-card">
                    <h3>{month.toLocaleString('default', { month: 'long' })}</h3>
                    <div className="mini-calendar">
                        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
                            <div key={day} className="day-label">{day}</div>
                        ))}
                        {Array.from({ length: new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate() }, (_, i) => i + 1).map(day => (
                            <div key={day} className="day-number">{day}</div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};
export default renderYearView