import React from 'react';
import { useNotification } from '../context/NotificationContext.jsx';

const Notification = () => {
    const { notification } = useNotification();

    if (!notification) {
        return null;
    }

    const { message, type } = notification;
    const notificationClass = `notification ${type === 'success' ? 'success' : 'error'}`;

    return (
        <div className={notificationClass}>
            {message}
        </div>
    );
};

export default Notification;