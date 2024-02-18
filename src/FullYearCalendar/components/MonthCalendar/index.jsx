import { Button } from "antd";
import classnames from "classnames";
import moment from "moment";
import { monthsList, weekDays } from "../../utils";

import styles from "./styles.module.less";

const MonthCalendar = ({ year, month, onChange, selectedDays }) => {
  // 设置本地化，使得周一为一周的开始
  moment.updateLocale("en", {
    week: {
      dow: 1, // 周一为一周的第一天
    },
  });

  const renderDays = () => {
    const monthStart = moment({ year, month }).startOf("month");
    const monthEnd = moment(monthStart).endOf("month");
    const startDate = monthStart.clone().startOf("week");
    const endDate = monthEnd.clone().endOf("week");

    const dateFormat = "D";
    const rows = [];

    let days = [];
    let day = startDate.clone();

    while (day.isBefore(endDate, "day")) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = day.clone();
        const inMonth = cloneDay.month() === monthStart.month();
        days.push(
          <td
            key={day.toString()}
            className={inMonth ? styles.inMonth : styles.outOfMonth}
            title={day.format("YYYY-MM-DD")}
          >
            <div
              onClick={() => {
                if (inMonth) {
                  onChange(cloneDay.format("YYYY-MM-DD"));
                }
              }}
              className={classnames(styles.day, {
                [styles.selected]:
                  inMonth &&
                  selectedDays.includes(cloneDay.format("YYYY-MM-DD")),
              })}
            >
              {day.format(dateFormat)}
            </div>
          </td>
        );
        day.add(1, "day");
      }
      rows.push(<tr>{days}</tr>);
      days = [];
    }

    return rows;
  };

  return (
    <div className={styles.monthContainer}>
      <div className={styles.header}>
        <span>{monthsList[month]}</span>
        <span>
          <Button size="small">全选</Button>
          <Button size="small" style={{ marginLeft: "4px" }}>
            工作日
          </Button>
          <Button size="small" style={{ marginLeft: "4px" }}>
            双休日
          </Button>
          <Button size="small" style={{ marginLeft: "4px" }}>
            清除
          </Button>
        </span>
      </div>
      <div className={styles.calendarContent}>
        <table>
          <thead>
            <tr>
              {weekDays.map((day) => (
                <th key={day}>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>{renderDays()}</tbody>
        </table>
      </div>
    </div>
  );
};

export default MonthCalendar;
