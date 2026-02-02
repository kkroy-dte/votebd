// imeUtils.ts

export function getWordBeforeCursor(
    text: string,
    cursor: number
) {
    let start = cursor;

    while (start > 0) {
        const ch = text[start - 1];

        // Stop at space or punctuation
        if (ch === " " || ch === "\n" || ch === "," || ch === ".") {
            break;
        }

        start--;
    }

    return {
        word: text.substring(start, cursor),
        start,
        end: cursor,
    };
}
