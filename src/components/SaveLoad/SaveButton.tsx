import React from 'react';

interface SaveButtonProps {
    data: () => void;
}

const SaveButton: React.FC<SaveButtonProps> = ({data}) => {
    return (
        <button onClick={data} className="button btn-save">
            Save
        </button>
    );
};

export default SaveButton;