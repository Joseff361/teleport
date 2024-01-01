import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { sessionActions } from '../../../store/sessionSlice';
import classes from './ToastModal.module.css';

function ToastModal() {
  const modal = useAppSelector(state => state.session.modal);
  const dispatch = useAppDispatch();

  useEffect(() => {
    modal.isOpen &&
      setTimeout(() => {
        dispatch(sessionActions.closeModal());
      }, 3000);
  }, [modal.isOpen, dispatch]);

  return (
    <div
      className={`${classes.modal} ${modal.isOpen && classes['modal--open']} ${
        modal.state === 'error' && classes['modal--error']
      }`}
    >
      <span className={classes['modal__text']}>{modal.message}&ensp;</span>
      <i
        onClick={() => dispatch(sessionActions.closeModal())}
        style={{ cursor: 'pointer' }}
        className="fa-solid fa-xmark"
      ></i>
    </div>
  );
}

export default ToastModal;
