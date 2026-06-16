export function isEqualLecturerObj(firstLecturer, secondLecturer) {
    const firstKeys = Object.keys(firstLecturer);
    const secondKeys = Object.keys(secondLecturer);

    if (firstKeys.length !== secondKeys.length) {
        return false;
    }

    for (let i = 0; i < firstKeys.length; i++) {
        const currentKey = firstKeys[i];

        if (!secondLecturer.hasOwnProperty(currentKey)) {
            return false;
        }

        if (firstLecturer[currentKey] !== secondLecturer[currentKey]) {
            return false;
        }
    }

    return true;
}

export function fillLessonArray(arraySize, lessonValue) {
    const lessonArray = [];

    for (let i = 0; i < arraySize; i++) {
        lessonArray.push(lessonValue);
    }

    return lessonArray;
}

export function countGroupPrefixes(groupWords, targetGroup) {
    let prefixCount = 0;

    for (let i = 0; i < groupWords.length; i++) {
        if (targetGroup.startsWith(groupWords[i])) {
            prefixCount++;
        }
    }

    return prefixCount;
}

export function isLecturerTextPalindrome(textValue) {
    const preparedText = String(textValue)
        .toLowerCase()
        .replaceAll("ё", "е")
        .replace(/[^a-zа-я0-9]/g, "");

    const reversedText = preparedText.split("").reverse().join("");

    return preparedText === reversedText;
}

export function isLecturerTextPalindromeByLoop(textValue) {
    const preparedText = String(textValue)
        .toLowerCase()
        .replaceAll("ё", "е")
        .replace(/[^a-zа-я0-9]/g, "");

    let leftIndex = 0;
    let rightIndex = preparedText.length - 1;

    while (leftIndex < rightIndex) {
        if (preparedText[leftIndex] !== preparedText[rightIndex]) {
            return false;
        }

        leftIndex++;
        rightIndex--;
    }

    return true;
}

export function findLessonAfterNoon(lessonCollection) {
    let lessonIndex = 0;
    let foundLesson = null;

    do {
        const currentLesson = lessonCollection[lessonIndex];

        if (currentLesson && currentLesson.time >= "12:00") {
            foundLesson = currentLesson;
        }

        lessonIndex++;
    } while (foundLesson === null && lessonIndex < lessonCollection.length);

    return foundLesson;
}
