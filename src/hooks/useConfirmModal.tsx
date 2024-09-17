import { Modal } from 'antd';
import { useState } from 'react';

interface ConfirmModalProps {
    title: string;
    question: string;
    confirmText: string;
    cancelText: string;
    onConfirm: () => void;
}

const useConfirmModal = () => {
    const [isOpen, setIsOpen] = useState(false);

    const closeModal = () => {
        setIsOpen(false);
    };

    const openModal = () => {
        setIsOpen(true);
    };

    const ModalWrapper = (data: ConfirmModalProps) => {
        const { title, question, confirmText, cancelText, onConfirm } = data;
        return (
            <Modal
                title={title}
                centered
                open={isOpen}
                onOk={() => {
                    onConfirm();
                    closeModal();
                }}
                onCancel={() => {
                    closeModal();
                }}
                width={300}
                okText={confirmText}
                cancelText={cancelText}
            >
                <h3 className="font-bold text-blue-500">{question}</h3>
            </Modal>
        );
    };

    return { ModalWrapper, closeModal, openModal };
};

export default useConfirmModal;
