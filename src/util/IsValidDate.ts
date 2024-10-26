export function isValidDate(date: number, month: number, year: number) {
    if (date <= 0 || month <= 0 || year <= 0 || month > 12) {
        return false;
    }
    if (month === 2) {
        if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
            return date <= 29;
        } else {
            return date <= 28;
        }
    }
    else if ([4, 6, 9, 11].includes(month)) {
        return date <= 30;
    } else {
        return date <= 31;
    }
}