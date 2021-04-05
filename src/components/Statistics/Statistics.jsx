import React from "react";
import { Tabs, Tab } from "react-bootstrap";
import LongStatistics from "./LongStatistics/LongStatistics";

import ShortStatistics from "./ShortStatistics/ShortStatistics";

import "./Statistics.scss";

const StatisticsTitles = {
  DAY: "За день",
  PERIOD: "За период",
};

export default function Statistics(props) {
  return (
    <div className="container">
      <div className="statistics">
        <Tabs defaultActiveKey="day" transition={false} id="noanim-tab-example">
          <Tab eventKey="day" title={StatisticsTitles.DAY}>
            <ShortStatistics />
          </Tab>
          <Tab eventKey="period" title={StatisticsTitles.PERIOD}>
            <LongStatistics />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
