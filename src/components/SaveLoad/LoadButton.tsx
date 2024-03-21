import React, {ChangeEvent, useState} from 'react';
import {Canvas} from '../../types/types';

interface LoadButtonProps {
    onDocumentLoad: (data: Canvas) => void;
}

const LoadButton: React.FC<LoadButtonProps> = ({onDocumentLoad}) => {
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        setError(null);

        const file = event.target.files?.[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const contents = e.target?.result as string;
                    const jsonData = JSON.parse(contents) as Canvas;
                    onDocumentLoad(jsonData);
                } catch (error) {
                    setError('Invalid JSON format or file');
                }
            };
            reader.readAsText(file);
        }
    };

    return (
        <label>
            <input type="file" onChange={handleFileChange} accept=".json"/>
            {error && <div>{error}</div>}
        </label>
    );
};

export default LoadButton;