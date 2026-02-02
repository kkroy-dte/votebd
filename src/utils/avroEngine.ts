const vowels: Record<string, string> = {
    'a': 'া', 'i': 'ি', 'I': 'ী', 'u': 'ু', 'U': 'ূ',
    'e': 'ে', 'o': 'ো', 'O': 'ৌ', 'rI': 'ৃ'
};

const consonants: Record<string, string> = {
    'k': 'ক', 'kh': 'খ', 'g': 'গ', 'gh': 'ঘ', 'Ng': 'ঙ',
    'ch': 'চ', 'chh': 'ছ', 'j': 'জ', 'jh': 'ঝ', 'NG': 'ঞ',
    'T': 'ট', 'Th': 'ঠ', 'D': 'ড', 'Dh': 'ঢ', 'N': 'ণ',
    't': 'ত', 'th': 'থ', 'd': 'দ', 'dh': 'ধ', 'n': 'ন',
    'p': 'প', 'f': 'ফ', 'ph': 'ফ', 'b': 'ব', 'v': 'ভ', 'bh': 'ভ', 'm': 'ম',
    'z': 'য', 'r': 'র', 'l': 'ল', 'sh': 'শ', 'S': 'ষ', 's': 'স', 'h': 'হ',
    'R': 'ড়', 'Rh': 'ঢ়', 'y': 'য়', 'ng': 'ং', 'CB': 'ঁ', 'hs': 'ঃ'
};

const independentVowels: Record<string, string> = {
    'a': 'অ', 'A': 'আ', 'i': 'ই', 'I': 'ঈ', 'u': 'উ', 'U': 'ঊ',
    'e': 'এ', 'O': 'ও', 'oi': 'ঐ', 'ou': 'ঔ'
};

export const avroParse = (text: string): string => {
    let res = "";
    let i = 0;
    while (i < text.length) {
        const char = text[i];
        const next = text[i + 1] || "";
        const combined = char + next;

        // চেক ৩ অক্ষর (যেমন: chh)
        const tri = text.substring(i, i + 3);

        if (independentVowels[combined] && (i === 0 || text[i - 1] === " ")) {
            res += independentVowels[combined];
            i += 2;
        } else if (independentVowels[char] && (i === 0 || text[i - 1] === " ")) {
            res += independentVowels[char];
            i += 1;
        } else if (consonants[tri]) {
            res += consonants[tri];
            i += 3;
        } else if (consonants[combined]) {
            res += consonants[combined];
            i += 2;
        } else if (consonants[char]) {
            res += consonants[char];
            // যদি কনসোনেন্টের পর ভাওয়েল থাকে তবে 'কার' হবে
            if (vowels[next]) {
                res += vowels[next];
                i += 2;
            } else {
                i += 1;
            }
        } else {
            res += char;
            i += 1;
        }
    }
    return res;
};