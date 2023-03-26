import React, { useState } from "react";
import { Modal } from "react-bootstrap";

const ProductsModal = ({ modalData }) => {
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const renderBackdrop = (props) => <div className="backdrop" {...props} />;

    return (
        <Modal
            className="modal"
            show={show}
            onHide={handleClose}
            renderBackdrop={renderBackdrop}
        >
            <div>
                <div className="modal-header">
                    <div className="modal-title">Produto {modalData.nameProduct}</div>
                    <div>
                        <span className="close-button" onClick={handleClose}>
                            x
                        </span>
                    </div>
                </div>
                <div className="modal-desc">
                    <label>
                        Nome do produto
                        <input type="text" value={modalData.nameProduct} disabled />
                    </label>
                    <label>
                        Quantidade
                        <input type="number" value={modalData.nameProduct} disabled />
                    </label>
                    <label>
                        Nome do produto
                        <input type="text" value={modalData.nameProduct} disabled />
                    </label>
                    <label>
                        Nome do produto
                        <input type="text" value={modalData.nameProduct} disabled />
                    </label>

                </div>
                <div className="modal-footer">
                    <button className="secondary-button" onClick={handleClose}>
                        Close
                    </button>
                </div>
            </div>
        </Modal>
    );
}

export default ProductsModal;