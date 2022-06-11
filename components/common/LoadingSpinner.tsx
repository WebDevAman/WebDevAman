import React from "react";
import Loader from "react-loader-spinner";

interface LoadingSpinnerProps {
  size?: number;
}

function LoadingSpinner({ size = 40 }: LoadingSpinnerProps) {
  return <Loader type="Grid" color="#ce061e" width={size} height={size} />;
}

export default LoadingSpinner;
