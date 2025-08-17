import { useEffect, useState } from 'react';

const Toast = ({ message, duration = 3000, onClose }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (message) {
            setVisible(true);
            const timer = setTimeout(() => {
                setVisible(false);
                if (onClose) onClose();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [message, duration, onClose]);

    return (
        <div
            className={`fixed bottom-5 right-5 transition-opacity duration-300 ease-in-out ${visible ? 'opacity-100' : 'opacity-0'}`}
            aria-live="polite"
        >
            <div className="bg-blue-500 text-white rounded-lg shadow-lg p-4">
                {message}
            </div>
        </div>
    );
};

export default Toast;