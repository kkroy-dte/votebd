import React, { useState } from "react";
import { avroProConvert } from "../utils/avroProEngine";
import { smartBackspace } from "../utils/avroUtils";

const InputBN: React.FC = () => {
    const [raw, setRaw] = useState("");
    const [bangla, setBangla] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;

        setRaw(value);
        setBangla(avroProConvert(value));
    };

    const handleBackspace = () => {
        const newRaw = smartBackspace(raw);

        setRaw(newRaw);
        setBangla(avroProConvert(newRaw));
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-xl">

                <h1 className="text-2xl font-bold text-center mb-4">
                    Professional Avro Keyboard
                </h1>

                <label>English Input</label>

                <textarea
                    value={raw}
                    onChange={handleChange}
                    rows={4}
                    className="w-full border p-3 rounded mt-1"
                    placeholder="ami banglay likhi..."
                />

                <button
                    onClick={handleBackspace}
                    className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
                >
                    Smart Backspace
                </button>

                <label className="block mt-4">Bangla Output</label>

                <textarea
                    value={bangla}
                    readOnly
                    rows={4}
                    className="w-full border p-3 rounded bg-gray-50 mt-1"
                />
            </div>
        </div>
    );
};

export default InputBN;
