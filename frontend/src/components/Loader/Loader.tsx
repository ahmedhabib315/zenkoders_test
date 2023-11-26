import React from "react";
import "../../assets/style/spinner.css";

const Loader = () => {
  return (
    <div>
      <div className="spinner-container">
        <div className="loading-spinner"></div>
      </div>
    </div>
  );
}

export default React.memo(Loader);