import React from "react";
import { Link } from "react-router-dom";

const StatsCards = ({ stats }) => {
  return (
    <div className="row g-4 mb-4">
      {stats.map((item, index) => (
        <Link
          to={item.path}
          className="col-md-6 col-xl-3 text-decoration-none"
          key={index}
        >
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <h6 className="text-muted">{item.title}</h6>
                <h2 className="fw-bold">{item.value}</h2>
              </div>
              <div className="fs-1">{item.icon}</div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default StatsCards;
