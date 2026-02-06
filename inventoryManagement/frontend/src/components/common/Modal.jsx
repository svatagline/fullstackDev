const Modal = ({
  show,
  title,
  children,
  onClose,
  onConfirm,
  confirmText = "Save",
  cancelText = "Cancel",
  size = "md",
}) => {
  if (!show) return null;

  return (
    <div className="modal fade show d-block" tabIndex="-1">
      <div className={`modal-dialog modal-${size}`}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button className="btn-close" onClick={onClose} />
          </div>

          <div className="modal-body">{children}</div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              {cancelText}
            </button>
            {onConfirm && (
              <button className="btn btn-primary" onClick={onConfirm}>
                {confirmText}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {/* <div className="modal-backdrop fade show" /> */}
    </div>
  );
};

export default Modal;
