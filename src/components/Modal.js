import { createElement } from '../utils/helpers';

const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    const handleClose = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return createElement('div', { className: 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center', onClick: handleClose },
        createElement('div', { className: 'bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/3' },
            createElement('h2', { className: 'text-xl font-semibold mb-4' }, title),
            children,
            createElement('button', { className: 'mt-4 bg-blue-500 text-white rounded px-4 py-2', onClick: onClose }, 'Close')
        )
    );
};

export default Modal;