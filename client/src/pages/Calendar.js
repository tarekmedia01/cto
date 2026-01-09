import React, { useState, useEffect } from 'react';
import { calendarAPI } from '../services/api';
import { format, startOfMonth, endOfMonth } from 'date-fns';
import { toast } from 'react-toastify';
import '../styles/Calendar.css';

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  useEffect(() => {
    fetchEvents();
  }, [selectedMonth]);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const start = startOfMonth(selectedMonth);
      const end = endOfMonth(selectedMonth);

      const { data } = await calendarAPI.getAll({
        startDate: start.toISOString(),
        endDate: end.toISOString(),
      });

      setEvents(data);
    } catch (error) {
      toast.error('Failed to fetch calendar events');
    } finally {
      setLoading(false);
    }
  };

  const groupEventsByDate = () => {
    const grouped = {};
    events.forEach((event) => {
      const date = format(new Date(event.startDate), 'yyyy-MM-dd');
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(event);
    });
    return grouped;
  };

  const groupedEvents = groupEventsByDate();

  const handlePreviousMonth = () => {
    setSelectedMonth(
      new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setSelectedMonth(
      new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1, 1)
    );
  };

  if (loading) {
    return <div className="loading">Loading calendar...</div>;
  }

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <h1>Calendar</h1>
        <div className="month-navigation">
          <button onClick={handlePreviousMonth}>&lt; Previous</button>
          <h2>{format(selectedMonth, 'MMMM yyyy')}</h2>
          <button onClick={handleNextMonth}>Next &gt;</button>
        </div>
      </div>

      <div className="events-list">
        {Object.keys(groupedEvents).length === 0 ? (
          <div className="no-events">
            <p>No events for this month</p>
          </div>
        ) : (
          Object.keys(groupedEvents)
            .sort()
            .map((date) => (
              <div key={date} className="date-group">
                <h3 className="date-header">
                  {format(new Date(date), 'EEEE, MMMM dd, yyyy')}
                </h3>
                <div className="events-for-date">
                  {groupedEvents[date].map((event) => (
                    <div
                      key={event._id}
                      className="event-card"
                      style={{ borderLeftColor: event.color }}
                    >
                      <div className="event-type-badge">{event.type}</div>
                      <h4>{event.title}</h4>
                      {event.description && <p>{event.description}</p>}
                      <div className="event-details">
                        {event.subject && (
                          <span className="event-detail">
                            <strong>Subject:</strong> {event.subject.name}
                          </span>
                        )}
                        {event.location && (
                          <span className="event-detail">
                            <strong>Location:</strong> {event.location}
                          </span>
                        )}
                        {!event.isAllDay && (
                          <span className="event-detail">
                            <strong>Time:</strong>{' '}
                            {format(new Date(event.startDate), 'HH:mm')}
                            {event.endDate &&
                              ` - ${format(new Date(event.endDate), 'HH:mm')}`}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
        )}
      </div>
    </div>
  );
};

export default Calendar;
