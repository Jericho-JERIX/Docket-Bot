export function yearDecider(date: number, month: number) {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentTimestamp = today.getTime();

    const targetTimestamp = new Date(currentYear, month - 1, date, 23, 59, 59).getTime();

    if (targetTimestamp <= currentTimestamp) {
        return currentYear + 1;
    } else {
        return currentYear;
    }
}