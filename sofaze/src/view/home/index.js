import React from "react";
import { useSelector } from "react-redux";

export default function Home() {
  return <div>
    home
    <h1>{useSelector(state => state.userEmail)}</h1>
    </div>;
}
