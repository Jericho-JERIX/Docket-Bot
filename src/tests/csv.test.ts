import CSVService from "../services/csv.service";
import { HomeworkService } from "../services/homework.service";
import { GetAllHomeworkService } from "../types/services/HomeworkServiceType";

( async () => {
    const response = await HomeworkService.getAll("1107965945869254657", undefined, undefined)
    const homeworks = (response as GetAllHomeworkService).homeworks

    // console.log(homeworks)
    const result = CSVService.exportToCsv(homeworks, "aaa")
    console.log(result)
})()