import { format, parse } from "date-fns";
import {
  DateFormats,
  DateTimeFormats,
  TimeFormats,
} from "../constants/data.constants";

export const capitalizeFirstLetter = (value: string) => {
  if (!value) return "";
  return value.charAt(0).toUpperCase() + value.slice(1);
};

export const temp = 1;

export const formattedDateTime = (
  value: string,
  displayFormat:
    | DateTimeFormats
    | DateFormats
    | TimeFormats = DateTimeFormats.TIME_DAY_MONTH_YEAR
): string => {
  const parsedTime = new Date(value);
  return value && format(parsedTime, displayFormat);
};

export const getSchemaDetailsFromId = (str: string) => {
  const arr = str.split(":");
  return arr;
};
