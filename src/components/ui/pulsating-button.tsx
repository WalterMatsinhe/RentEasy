import React from "react";
import { cn } from "@/utils/cn";

export interface PulsatingButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  pulseColor?: string;
  duration?: string;
}

export const PulsatingButton = React.forwardRef<
  HTMLButtonElement,
  PulsatingButtonProps
>(
  (
    {
      className,
      children,
      pulseColor = "rgba(229, 230, 66, 0.75)",
      duration = "1.5s",
      ...props
    },
    ref,
  ) => {
    return (
      <>
        <style>{`
          @keyframes custom-pulse {
            0% { box-shadow: 0 0 0 0 rgba(229, 230, 66, 0.7); }
            70% { box-shadow: 0 0 0 15px rgba(229, 230, 66, 0); }
            100% { box-shadow: 0 0 0 0 rgba(229, 230, 66, 0); }
          }
        `}</style>
        <button
          ref={ref}
          className={cn(
            "relative text-center cursor-pointer flex justify-center items-center rounded-full text-[#264559] bg-[#E5E642] px-8 py-0 h-12 font-bold transition-all",
            className,
          )}
          style={
            {
              "--pulse-color": pulseColor,
              "--duration": duration,
              animation: `custom-pulse ${duration} infinite`
            } as React.CSSProperties
          }
          {...props}
        >
          <div className="relative z-10">{children}</div>
        </button>
      </>
    );
  },
);

PulsatingButton.displayName = "PulsatingButton";
