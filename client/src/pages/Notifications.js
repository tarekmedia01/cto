import React from 'react';
import { useNotifications } from '../context/NotificationContext';
import { format } from 'date-fns';
import '../styles/Notifications.css';

const Notifications = () => {
  const { notifications, markAsRead, markAllAsRead, deleteNotification } =
    useNotifications();

  return (
    <div className="notifications-container">
      <div className="notifications-header">
        <h1>Notifications</h1>
        {notifications.some((n) => !n.isRead) && (
          <button className="mark-all-read-button" onClick={markAllAsRead}>
            Mark All as Read
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="no-notifications">
          <p>No notifications</p>
        </div>
      ) : (
        <div className="notifications-list">
          {notifications.map((notification) => (
            <div
              key={notification._id}
              className={`notification-item ${
                !notification.isRead ? 'unread' : ''
              }`}
            >
              <div className="notification-content">
                <div className="notification-type-badge">
                  {notification.type}
                </div>
                <div className="notification-text">
                  <h3>{notification.title}</h3>
                  <p>{notification.message}</p>
                  <span className="notification-date">
                    {format(new Date(notification.createdAt), 'PPp')}
                  </span>
                </div>
              </div>
              <div className="notification-actions">
                {!notification.isRead && (
                  <button
                    className="mark-read-button"
                    onClick={() => markAsRead(notification._id)}
                  >
                    Mark as Read
                  </button>
                )}
                <button
                  className="delete-button"
                  onClick={() => deleteNotification(notification._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;
