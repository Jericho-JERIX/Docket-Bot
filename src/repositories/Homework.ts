import { Homework } from "@prisma/client";
import { HomeworkType } from "../constants/homework";
import { prisma } from "../database/prisma";
import { DocketHomework } from "../types/services/HomeworkServiceType";
import { isValidDate } from "../util/IsValidDate";
import { yearDecider } from "../util/YearDecider";

interface CreateDocketHomework {
  fileId: number;
  date?: number;
  month?: number;
  year?: number;
  type: HomeworkType;
  label: string;
}

const MAX_TIMESTAMP = new Date(9999999999999);
const DELTA_TIME_SECOND = 0;

export default class HomeworkRepository {
  private static generate(
    payload: CreateDocketHomework
  ): Homework | Error {
    if (!payload.date || !payload.month || !payload.year) {
      return {
        file_id: payload.fileId,
        date: 0,
        month: 0,
        year: 0,
        timestamp: MAX_TIMESTAMP,
        day_name: "Sunday",
        no_deadline: true,
        ...payload,
      };
    }

    let decidedYear: number;
    let timestamp: number;
    try {
      decidedYear = yearDecider(payload.date, payload.month);

      if (!isValidDate(payload.date, payload.month, decidedYear)) {
        return { status: 400 };
      }

      timestamp = new Date(
        decidedYear,
        payload.month - 1,
        payload.date,
        23,
        59,
        59
      ).getTime();
    } catch (e) {
      return Error(String(e));
    }

    const finalTimestamp = timestamp + DELTA_TIME_SECOND;
    return prisma.homework.create({
      data: {
        file_id: payload.fileId,
        timestamp: new Date(finalTimestamp),
        day_name: new Date(finalTimestamp).toLocaleDateString("en-US", {
          weekday: "long",
        }),
        no_deadline: false,
        date: payload.date,
        month: payload.month,
        year: decidedYear,
        type: payload.type,
        label: payload.label,
      },
    });
  }

  static async create(payload: CreateDocketHomework, fileId: number) {
    const data = await this.generate({ ...payload, fileId });
    if (data instanceof Error) {
      return data;
    }
    return prisma.homework.create({ data });
  }

  static async bulkCreate(payload: CreateDocketHomework[], fileId: number) {
    const dataList = payload
  }
}
