import {
    consonants,
    vowels,
    vowelKars,
    joints,
    HASANT,
} from "./avroAdvancedMap";

function isConsonant(s: string) {
    return consonants[s] !== undefined;
}

function isVowel(s: string) {
    return vowels[s] !== undefined;
}

function isJoint(s: string) {
    return joints[s] !== undefined;
}

export function avroProConvert(text: string): string {
    let result = "";
    let i = 0;
    let lastWasConsonant = false;

    while (i < text.length) {
        let found = false;

        /* ===== 3-char joint (ksh) ===== */
        if (i + 2 < text.length) {
            const three = text.substring(i, i + 3).toLowerCase();

            if (isJoint(three)) {
                if (lastWasConsonant) result += HASANT;

                result += joints[three];
                lastWasConsonant = true;

                i += 3;
                found = true;
            }
        }

        /* ===== 2-char ===== */
        if (!found && i + 1 < text.length) {
            const two = text.substring(i, i + 2).toLowerCase();

            // Joint
            if (isJoint(two)) {
                if (lastWasConsonant) result += HASANT;

                result += joints[two];
                lastWasConsonant = true;

                i += 2;
                found = true;
            }

            // Consonant
            else if (isConsonant(two)) {
                if (lastWasConsonant) result += HASANT;

                result += consonants[two];
                lastWasConsonant = true;

                i += 2;
                found = true;
            }

            // Vowel
            else if (isVowel(two)) {
                if (lastWasConsonant) {
                    result += vowelKars[two];
                } else {
                    result += vowels[two];
                }

                lastWasConsonant = false;

                i += 2;
                found = true;
            }
        }

        /* ===== 1-char ===== */
        if (!found) {
            const one = text[i].toLowerCase();

            // Consonant
            if (isConsonant(one)) {
                if (lastWasConsonant) result += HASANT;

                result += consonants[one];
                lastWasConsonant = true;
            }

            // Vowel
            else if (isVowel(one)) {
                if (lastWasConsonant) {
                    result += vowelKars[one];
                } else {
                    result += vowels[one];
                }

                lastWasConsonant = false;
            }

            // Others
            else {
                result += text[i];
                lastWasConsonant = false;
            }

            i++;
        }
    }

    return result;
}
