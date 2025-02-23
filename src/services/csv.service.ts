import { Homework } from "@prisma/client";
import { writeFileSync } from "fs";

interface CSVField {
    date: number;
    month: number;
    year: number;
    type: string;
    label: string;
}

export default class CSVService {

    private static createFilename() {
        const date = new Date();

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        const formattedDate = `homework_${day}${month}${year}T${hours}${minutes}${seconds}`;
    }

    static exportToCsv(homeworkList: Homework[], filename: string) {
        const header = "date,month,year,type,label"
        const content = homeworkList.map((homework) => {
            return `${homework.date},${homework.month},${homework.year},${homework.type},${homework.label}`
        }).join("\n");
        const csvString = `${header}\n${content}`;
        writeFileSync(filename, csvString);
        return { filename }
    }
}