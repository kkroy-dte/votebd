const phoneticMap: { [key: string]: string } = {
    '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪', '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯',
    'k': 'ক', 'kh': 'খ', 'g': 'গ', 'gh': 'ঘ', 'Ng': 'ঙ',
    'ch': 'চ', 'chh': 'ছ', 'j': 'জ', 'jh': 'ঝ', 'NG': 'ঞ',
    'T': 'ট', 'Th': 'ঠ', 'D': 'ড', 'Dh': 'ঢ', 'N': 'ণ',
    't': 'ত', 'th': 'থ', 'd': 'দ', 'dh': 'ধ', 'n': 'ন',
    'p': 'প', 'ph': 'ফ', 'f': 'ফ', 'b': 'ব', 'bh': 'ভ', 'v': 'ভ', 'm': 'ম',
    'z': 'য', 'r': 'র', 'l': 'ল', 'sh': 'শ', 'S': 'ষ', 's': 'স', 'h': 'হ',
    'R': 'ড়', 'Rh': 'ঢ়', 'y': 'য়',
    'a': 'আ', 'A': 'আ', 'i': 'ই', 'I': 'ঈ', 'u': 'উ', 'U': 'ঊ', 'e': 'এ', 'E': 'এ', 'O': 'ও', 'o': 'ো',
};

export const convertToBengali = (text: string): string => {
    let output = "";
    let i = 0;

    while (i < text.length) {
        let match = "";
        // ৩ অক্ষরের কম্বিনেশন চেক (যেমন: chh)
        if (i + 2 < text.length && phoneticMap[text.substring(i, i + 3)]) {
            match = phoneticMap[text.substring(i, i + 3)];
            i += 3;
        }
        // ২ অক্ষরের কম্বিনেশন চেক (যেমন: kh, gh, th)
        else if (i + 1 < text.length && phoneticMap[text.substring(i, i + 2)]) {
            match = phoneticMap[text.substring(i, i + 2)];
            i += 2;
        }
        // ১ অক্ষরের চেক (যেমন: k, g, a)
        else if (phoneticMap[text[i]]) {
            match = phoneticMap[text[i]];
            i += 1;
        }
        else {
            match = text[i];
            i += 1;
        }
        output += match;
    }
    return output;
};