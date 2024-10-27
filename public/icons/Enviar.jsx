import * as React from "react";

const EnviarIcon = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    {...props} 
    width={props.size || "24"} 
    height={props.size || "24"} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth={props.stroke || "2"} 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M10 18l6 -6l-6 -6v12"></path>
  </svg>
);

export default EnviarIcon;
