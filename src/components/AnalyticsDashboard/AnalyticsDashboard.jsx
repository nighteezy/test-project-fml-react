import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import { selectEmployees } from "../../store/employeeSlice";
import { selectTasks } from "../../store/taskSlice";
import "./AnalyticsDashboard.css";

const AnalyticsDashboard = () => {
  const employees = useSelector(selectEmployees);
  const tasks = useSelector(selectTasks);
  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#FF6384",
    "#36A2EB",
  ];

  const taskStatusData = useMemo(() => {
    const completedCount = tasks.filter(
      (task) => task.status === "Выполнена"
    ).length;
    const pendingCount = tasks.filter(
      (task) => task.status === "В ожидании"
    ).length;
    const inProgressCount = tasks.filter(
      (task) => task.status === "В процессе"
    ).length;
    const noStatusCount = tasks.filter(
      (task) => task.status === "Не начата"
    ).length;

    const data = [
      { name: "Выполнено", value: completedCount },
      { name: "В ожидании", value: pendingCount },
      { name: "В процессе", value: inProgressCount },
      { name: "Без статуса", value: noStatusCount },
    ];

    return data;
  }, [tasks]);

  const ageData = useMemo(() => {
    const ageGroups = {
      "20-30": 0,
      "31-40": 0,
      "41-50": 0,
      "51-60": 0,
      "60+": 0,
    };
    employees.forEach((emp) => {
      if (emp.age <= 30) ageGroups["20-30"]++;
      else if (emp.age <= 40) ageGroups["31-40"]++;
      else if (emp.age <= 50) ageGroups["41-50"]++;
      else if (emp.age <= 60) ageGroups["51-60"]++;
      else ageGroups["60+"]++;
    });
    const data = Object.entries(ageGroups).map(([key, value]) => ({
      name: key,
      value,
    }));

    return data;
  }, [employees]);

  const positionData = useMemo(() => {
    const positionMap = employees.reduce((acc, emp) => {
      acc[emp.position] = acc[emp.position] ? acc[emp.position] + 1 : 1;
      return acc;
    }, {});
    const data = Object.entries(positionMap).map(([key, value]) => ({
      name: key,
      value,
    }));

    return data;
  }, [employees]);

  return (
    <div className="analytics-dashboard">
      <div className="analytics-dashboard__top">
        <div className="analytics-dashboard__top-left">
          <h3 className="title-reset analytics-dashboard__title">
            Статус задач
          </h3>
          <PieChart width={600} height={500}>
            <Pie
              data={taskStatusData}
              cx={200}
              cy={200}
              innerRadius={60}
              outerRadius={150}
              paddingAngle={5}
              dataKey="value"
              label
              isAnimationActive={false}
            >
              {taskStatusData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
        <div className="analytics-dashboard__top-right">
          <h3 className="title-reset analytics-dashboard__title">
            Распределение сотрудников по должностям
          </h3>
          <RadarChart
            cx={300}
            cy={250}
            outerRadius={150}
            width={600}
            height={500}
            data={positionData}
          >
            <PolarGrid />
            <PolarAngleAxis dataKey="name" />
            <PolarRadiusAxis />
            <Tooltip />
            <Radar
              name="Positions"
              dataKey="value"
              stroke="#8884d8"
              fill="#8884d8"
              fillOpacity={0.7}
            />
          </RadarChart>
        </div>
      </div>
      <div className="analytics-dashboard__bottom">
        <h3 className="title-reset analytics-dashboard__title">
          Возрастной состав сотрудников
        </h3>
        <BarChart width={1000} height={400} data={ageData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8">
            {ageData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
