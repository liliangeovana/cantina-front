import React, { ChangeEvent, FC } from 'react';

interface ModalObservacaoProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: ()=> void;
    observacao: string;
    setObservacao: (observacao: string) => void;
}

const ModalObservacao: FC<ModalObservacaoProps> = ({ isOpen,onSave, onClose, observacao, setObservacao }) => {
    if (!isOpen) return null;

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setObservacao(e.target.value);
    };


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="w-96 bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Observação</h2>
                <textarea
                    className="w-full p-2 border rounded-md"
                    rows={5}
                    value={observacao}
                    onChange={handleChange}
                />
                <div className="mt-4 flex justify-end space-x-2">
                    <button
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-500"
                        onClick={onClose}
                    >
                        Cancelar
                    </button>
                    <button
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-500"
                        onClick={onSave}
                    >
                        Salvar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalObservacao;
