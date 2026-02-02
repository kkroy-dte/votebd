export function smartBackspace(text: string) {
    return text.normalize("NFC").slice(0, -1);
}
