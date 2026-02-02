import React, { useRef, useState } from "react";
import { convertWithCursor } from "../../utils/avroImeEngine";

const AvroImeKeyboard: React.FC = () => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const [value, setValue] = useState("");

    const handleChange = (
        e: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        const el = e.target;

        const rawText = el.value;
        const cursor = el.selectionStart;

        const { text, cursor: newCursor } =
            convertWithCursor(rawText, cursor);

        setValue(text);

        // Restore cursor after render
        requestAnimationFrame(() => {
            if (textareaRef.current) {
                textareaRef.current.selectionStart = newCursor;
                textareaRef.current.selectionEnd = newCursor;
            }
        });
    };

    return (
        <div className=" bg-slate-100 flex justify-center items-center p-4">
            <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-xl">

                <h1 className="text-base font-bold text-center mb-2">
                    Avro IME Keyboard
                </h1>

                <textarea
                    ref={textareaRef}
                    value={value}
                    onChange={handleChange}
                    rows={2}
                    className="w-full border p-3 rounded focus:ring"
                    placeholder="Type anywhere..."
                />

                <p className="text-sm text-gray-500 mt-2 text-center">
                    Cursor-safe Avro typing enabled
                </p>

            </div>
        </div>
    );
};

export default AvroImeKeyboard;
