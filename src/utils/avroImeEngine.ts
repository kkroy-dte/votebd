import { avroProConvert } from "./avroProEngine";
import { getWordBeforeCursor } from "./imeUtils";

export function convertWithCursor(
    text: string,
    cursor: number
) {
    const { word, start, end } =
        getWordBeforeCursor(text, cursor);

    // Convert only last word
    const converted = avroProConvert(word);

    // Replace in original text
    const newText =
        text.substring(0, start) +
        converted +
        text.substring(end);

    // New cursor position
    const newCursor = start + converted.length;

    return {
        text: newText,
        cursor: newCursor,
    };
}
