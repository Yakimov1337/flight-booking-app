import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { closeModal } from '../../redux/modalSlice';
import styles from './DeleteModal.module.css';

interface DeleteModalProps {
  onConfirm: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ onConfirm }) => {
  const dispatch = useDispatch();
  const { isOpen, bookingId } = useSelector((state: RootState) => state.modal);
  const theme = useSelector((state: RootState) => state.theme.mode);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      dispatch(closeModal());
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={`${styles.backdrop} ${theme === 'light' ? styles.light : ''}`}
      onClick={handleBackdropClick}
    >
      <div className={styles.modal}>
        <button
          className={styles.closeButton}
          onClick={() => dispatch(closeModal())}
        >
          &times;
        </button>
        <p>Are you sure you want to delete booking with ID {bookingId}?</p>
        <div className={styles.buttons}>
          <button onClick={() => dispatch(closeModal())} className={styles.cancelButton}>
            Cancel
          </button>
          <button onClick={onConfirm} className={styles.deleteButton}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
