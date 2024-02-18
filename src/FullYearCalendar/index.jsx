import { Button, Select } from "antd";
import moment from "moment";
import { useState } from "react";
import MonthCalendar from "./components/MonthCalendar";
import styles from "./styles.module.less";

const Option = Select.Option;

import { generateYears, monthsList } from "./utils";

const yearsList = generateYears(2010, 2050);

const FullYearCalendar = (props) => {
  const [currentYear, setCurrentYear] = useState(() => {
    return moment().year();
  });

  const [value, setValue] = useState(() => {
    return Array.isArray(props?.value) ? props.value : [];
  });

  const handleYearChange = (year) => {
    setCurrentYear(year);
  };

  const innerOnChange = (day) => {
    if (value.includes(day)) {
      setValue(value.filter((item) => !item === day));
    } else {
      setValue([...value, day]);
    }
  };

  console.log("value", value);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Select showSearch value={currentYear} onChange={handleYearChange}>
          {yearsList.map((year) => (
            <Option value={year} key={year}>
              {year}年
            </Option>
          ))}
        </Select>
        <div>
          <Button>全选</Button>
          <Button style={{ marginLeft: "8px" }}>工作日</Button>
          <Button style={{ marginLeft: "8px" }}>双休日</Button>
          <Button style={{ marginLeft: "8px" }}>清除</Button>
        </div>
      </div>
      <div className={styles.monthContainer}>
        {monthsList.map((month, index) => (
          <MonthCalendar
            key={month}
            year={currentYear}
            month={index}
            selectedDays={value}
            onChange={innerOnChange}
          />
        ))}
      </div>
    </div>
  );
};

export default FullYearCalendar;
