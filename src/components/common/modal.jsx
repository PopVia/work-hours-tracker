import "./modal.css";

export const Modal = (props) => {
  const { children, headerContent, footerContent, onClose } = props;
  return (
    <div id="myModal" className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <button className="btn-close" onClick={onClose}>
            X
          </button>
          <h3 className="modal-title">{headerContent}</h3>
        </div>
        <div className="modal-body">{children}</div>
        {footerContent && (
          <div className="modal-footer">
            <h3>{footerContent}</h3>
          </div>
        )}
      </div>
    </div>
  );
};
