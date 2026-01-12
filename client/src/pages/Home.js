import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { resourceAPI, calendarAPI } from '../services/api';
import { format } from 'date-fns';
import '../styles/Home.css';

const Home = () => {
  const { user } = useAuth();
  const [recentResources, setRecentResources] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resourcesRes, eventsRes] = await Promise.all([
          resourceAPI.getAll(),
          calendarAPI.getAll({
            startDate: new Date().toISOString(),
          }),
        ]);

        setRecentResources(resourcesRes.data.slice(0, 5));
        setUpcomingEvents(eventsRes.data.slice(0, 5));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="home-container">
      <div className="welcome-section">
        <h1>
          Welcome, {user.firstName} {user.lastName}
        </h1>
        {user.role === 'student' && (
          <div className="user-info">
            <p>
              <strong>Student Number:</strong> {user.studentNumber}
            </p>
            {user.filiere && (
              <p>
                <strong>Filiere:</strong> {user.filiere.name}
              </p>
            )}
            <p>
              <strong>Level:</strong> {user.level}
              {user.semester && ` - ${user.semester}`}
            </p>
          </div>
        )}
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <div className="card-header">
            <h2>Recent Resources</h2>
            <Link to="/resources" className="view-all">
              View All
            </Link>
          </div>
          <div className="card-content">
            {recentResources.length === 0 ? (
              <p>No resources available</p>
            ) : (
              <ul className="resource-list">
                {recentResources.map((resource) => (
                  <li key={resource._id} className="resource-item">
                    <div className="resource-info-home">
                      <span className="resource-type-badge">
                        {resource.type}
                      </span>
                      <span className="resource-name">{resource.title}</span>
                    </div>
                    <span className="resource-date">
                      {format(new Date(resource.uploadDate), 'dd MMM')}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-header">
            <h2>Upcoming Events</h2>
            <Link to="/calendar" className="view-all">
              View All
            </Link>
          </div>
          <div className="card-content">
            {upcomingEvents.length === 0 ? (
              <p>No upcoming events</p>
            ) : (
              <ul className="event-list">
                {upcomingEvents.map((event) => (
                  <li key={event._id} className="event-item">
                    <div className="event-info-home">
                      <span
                        className="event-type-badge"
                        style={{ backgroundColor: event.color }}
                      >
                        {event.type}
                      </span>
                      <div>
                        <div className="event-name">{event.title}</div>
                        {event.subject && (
                          <div className="event-subject">
                            {event.subject.name}
                          </div>
                        )}
                      </div>
                    </div>
                    <span className="event-date">
                      {format(new Date(event.startDate), 'dd MMM, HH:mm')}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {user.role === 'admin' && (
        <div className="admin-quick-actions">
          <h2>Quick Actions</h2>
          <div className="action-buttons">
            <Link to="/admin/resources/new" className="action-button">
              Upload Resource
            </Link>
            <Link to="/admin/calendar/new" className="action-button">
              Create Event
            </Link>
            <Link to="/admin/filieres" className="action-button">
              Manage Filieres
            </Link>
            <Link to="/admin/classes" className="action-button">
              Manage Classes
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
