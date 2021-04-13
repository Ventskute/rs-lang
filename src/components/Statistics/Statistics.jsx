import React from "react";
import { Tabs, Tab, Container } from "react-bootstrap";
import LongStatistics from "./LongStatistics/LongStatistics";
import ShortStatistics from "./ShortStatistics/ShortStatistics";
import Header from '../Header/Header';

import "./Statistics.scss";

const StatisticsTitles = {
  DAY: "За день",
  PERIOD: "За период",
};

export default function Statistics(props) {
  return (
    <div className="statistics">
      <Header />
      <Container>
        <h2>Статистика</h2>
        <Tabs defaultActiveKey="day" transition={false} id="noanim-tab-example">
          <Tab eventKey="day" title={StatisticsTitles.DAY}>
            <ShortStatistics />
          </Tab>
          <Tab eventKey="period" title={StatisticsTitles.PERIOD}>
            <LongStatistics />
          </Tab>
        </Tabs>
      </Container>
    </div>
  );
}
