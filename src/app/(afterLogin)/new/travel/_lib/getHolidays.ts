import { Holiday } from "@/model/calendar";
import { QueryFunction } from "@tanstack/query-core";
import axios from "axios";
export const getHoliday = async (year: number, month: number) => {
  try {
    console.log("year", year, month);
    const response = await axios.get(
      `http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo?solYear=${year}&solMonth=${month
        .toString()
        .padStart(2, "0")}&ServiceKey=${process.env.NEXT_PUBLIC_HOLIDAY_API_KEY}`
    );
    let result = response.data.response?.body?.items?.item || [];

    if (!Array.isArray(result)) {
      result = [result];
    }
    console.log(result, "result");
    return result || [];
  } catch (err) {
    console.log("holiday error", err);
    throw new Error("Failed to fetch data");
  }
};
