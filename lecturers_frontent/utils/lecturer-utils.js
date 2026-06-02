export function isEqual(value1, value2) {
    if (Array.isArray(value1) || Array.isArray(value2)) {
        if (!Array.isArray(value1) || !Array.isArray(value2)) {
            return false;
        }

        if (value1.length !== value2.length) {
            return false;
        }

        for (let i = 0; i < value1.length; i++) {
            if (!isEqual(value1[i], value2[i])) {
                return false;
            }
        }

        return true;
    }

    if (typeof value1 !== typeof value2) {
        return false;
    }

    if (value1 !== null && typeof value1 === "object") {
        if (value2 === null) {
            return false;
        }

        const keys1 = Object.keys(value1);
        const keys2 = Object.keys(value2);

        if (keys1.length !== keys2.length) {
            return false;
        }

        for (let key of keys1) {
            if (!isEqual(value1[key], value2[key])) {
                return false;
            }
        }

        return true;
    }

    return value1 === value2;
}

export function isPalindromeReverse(text) {
    const str = String(text).toLowerCase().replaceAll(" ", "");
    return str === str.split("").reverse().join("");
}

export function isPalindromeCycle(text) {
    const str = String(text).toLowerCase().replaceAll(" ", "");

    let left = 0;
    let right = str.length - 1;

    while (left < right) {
        if (str[left] !== str[right]) {
            return false;
        }

        left++;
        right--;
    }

    return true;
}
