import { Homework } from "@prisma/client";

const Months = [
    "january", "february", "march", "april", "may", "june",
    "july", "august", "september", "october", "november", "december"
]

export async function searchHomework(homeworks: Homework[], keyword?: string) {
    if (!keyword) {
        return homeworks;
    }

    const relatedLabel = homeworks.filter(homework => homework.label.toLowerCase().includes(keyword.toLowerCase()));
    const releatedType = homeworks.filter(homework => homework.type.toLowerCase().includes(keyword.toLowerCase()));
    const releatedDayname = homeworks.filter(homework => homework.day_name.toLowerCase().includes(keyword.toLowerCase()));

    let relatedDate: Homework[] = [];
    let relatedMonth: Homework[] = [];

    if (!isNaN(Number(keyword))) {
        relatedDate = homeworks.filter(homework => homework.date === Number(keyword));
    }
    
    if (!isNaN(Number(keyword))) {
        relatedMonth = homeworks.filter(homework => homework.date === Number(keyword));
    } else {
        relatedMonth = homeworks.filter(homework => Months[homework.month - 1].toLowerCase().includes(keyword.toLowerCase()));
    }

    return [...relatedLabel, ...releatedType, ...releatedDayname, ...relatedDate, ...relatedMonth];
} 