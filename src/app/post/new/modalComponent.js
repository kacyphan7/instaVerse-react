// ModalComponent.js
import React from 'react';

const ModalComponent = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
    console.log('modal component');
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                contents of the modal
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default ModalComponent;
