import React from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";

import './Main.scss';

export default function Main() {
  return (
    <div className='main'>
      <Header />
      <main></main>
      <Footer />
    </div>
  )
}