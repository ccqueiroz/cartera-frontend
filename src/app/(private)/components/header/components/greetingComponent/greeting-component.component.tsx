"use client";

import { Calendar } from "lucide-react";
import { useEffect, useState } from "react";

const currentDate = new Date().toLocaleDateString("pt-BR", {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

export const GreetingComponent = ({ name }: { name: string }) => {
  const [currentTime, setCurrentTime] = useState("00:00:00");

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Bom dia";
    if (hour < 18) return "Boa tarde";
    return "Boa noite";
  };

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds().toString().padStart(2, "0");
      setCurrentTime(`${hours}:${minutes}:${seconds}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="flex flex-col">
        <h2 className="text-xl md:text-2xl font-semibold text-white animate-fade-in-up">
          {getGreeting()}, <span className="text-neon-blue">{name}</span>
        </h2>
        <div className="flex gap-2 items-center">
          <Calendar className="h-4 w-4 text-white/70 mb-1" />
          <span
            className="text-white/70 digital animate-fade-in-up text-md"
            style={{ animationDelay: "50ms" }}
          >
            {currentDate}
          </span>
          <span>-</span>
          <span className="digital text-neon-blue text-md font-medium">
            {currentTime}
          </span>
        </div>
      </div>
    </div>
  );
};
