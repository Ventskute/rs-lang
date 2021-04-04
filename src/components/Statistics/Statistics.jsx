import React from "react";
import { Tabs, Tab } from "react-bootstrap";

import ShortStatistics from "./ShortStatistics/ShortStatistics";

import "./Statistics.scss";

const StatisticsTitles = {
  DAY: "За день",
  PERIOD: "За период",
};

export default function Statistics(props) {
  return (
    <div className="statistics">
      <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
        <Tab eventKey="day" title={StatisticsTitles.DAY}>
          <ShortStatistics />
        </Tab>
        <Tab eventKey="period" title={StatisticsTitles.PERIOD}>
          <p>Период</p>
        </Tab>
      </Tabs>
    </div>
  );
}
