import './style.css';
import { useSnapbrilliaContext } from "../../context/SnapbrilliaContext.jsx";

export const Modal = ({children}) => {
  const { closeModal, isOpenModal } = useSnapbrilliaContext();
  return (
    <>
    {
      isOpenModal && (
        <div className="modal__background" onClick={(e) => {
          e.preventDefault();
          // closeModal();
        }}>
          <div className="modal__body">
            {children}
          </div>
        </div>
      )
    }
    </>

  );
};
