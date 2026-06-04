import React from 'react'
import { FaHome } from "react-icons/fa";
const DashboardHeader = () => {
  return (
 <div className="topbar bg-white border-bottom shadow-sm mb-4 px-4 py-3 d-flex align-items-center justify-content-between rounded-3">
        <div className="d-flex align-items-center gap-2">
          <div
            className="d-flex align-items-center justify-content-center bg-primary bg-opacity-10 text-primary rounded-circle"
            style={{ width: "42px", height: "42px" }}
          >
            <FaHome size={20} />
          </div>

          <div>
            <h4 className="mb-0 fw-bold text-dark">Dashboard</h4>
            <small className="text-muted">
              Welcome back, manage your store easily
            </small>
          </div>
        </div>
      </div>  )
}

export default DashboardHeader