"use client";
import React, { useState, useEffect } from "react";
import styles from "./Clock.module.css"; // 스타일을 객체로 임포트

/**
 * Represents a component that displays the current time without seconds and AM/PM indicator.
 *
 * @returns {JSX.Element} The rendered Clock component.
 */
function Clock() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  return <div className={styles.clock}>{formatTime(currentTime)}</div>;
}

export default Clock;