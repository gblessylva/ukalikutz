const renderWeekView = ( currentDate, getEventsForDate ) => {
	const startOfWeek = new Date( currentDate );
	startOfWeek.setDate( currentDate.getDate() - currentDate.getDay() );
	const days = Array.from( { length: 7 }, ( _, i ) => {
		const day = new Date( startOfWeek );
		day.setDate( startOfWeek.getDate() + i );
		return day;
	} );

	return (
		<div className="week-view">
			{ days.map( ( day, index ) => {
				const dateStr = day.toISOString().split( 'T' )[ 0 ];
				const dayEvents = getEventsForDate( dateStr );
				return (
					<div key={ index } className="day-column">
						<div className="day-header">
							{ day.toLocaleDateString( 'en-US', {
								weekday: 'short',
								month: 'numeric',
								day: 'numeric',
							} ) }
						</div>
						{ dayEvents.map( ( event ) => (
							<div
								key={ event.id }
								className={ `event ${ event.color }` }
							>
								<span className="event-time">
									{ event.time }
								</span>
								<span className="event-title">
									{ event.title }
								</span>
							</div>
						) ) }
					</div>
				);
			} ) }
		</div>
	);
};

export default renderWeekView;
