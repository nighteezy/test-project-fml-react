import React from "react";
import "./ConfirmationModal.css";

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Подтверждение удаления",
  message = "Вы уверены, что хотите удалить этот элемент?",
}) => {
  if (!isOpen) return null;

  const handleConfirm = async () => {
    await onConfirm();
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">{title}</h2>
        <p className="modal-text">{message}</p>
        <div className="modal-actions">
          <button
            onClick={handleConfirm}
            className="modal-btn__remove btn-remove"
          >
            Удалить
          </button>
          <button onClick={onClose} className="btn-reset modal-btn">
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
