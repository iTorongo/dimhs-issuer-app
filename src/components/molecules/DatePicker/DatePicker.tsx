import generatePicker from "antd/es/date-picker/generatePicker";
import dateFnsGenerateConfig from "rc-picker/lib/generate/dateFns";
import "antd/es/date-picker/style/index";

const DatePicker = generatePicker<Date>(dateFnsGenerateConfig);

export default DatePicker;
