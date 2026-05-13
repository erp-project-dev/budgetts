import React from "react";

interface SkeletonWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export function SkeletonWrapper({
  children,
  className = "",
}: SkeletonWrapperProps) {
  return (
    <div className=" p-4">
      <div className={`flex flex-col gap-4 animate-pulse ${className}`}>
        {children}
      </div>
    </div>
  );
}
