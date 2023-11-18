import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "./AppProvider";

function DifficultySelection() {
  const context = useContext(AppContext);
  return (
    <div className="difficulty-selection">
      <h2>Select your difficulty</h2>
      <div className="difficulty-cont">
        <div className="menu-item easy">
          <Link
            to={"/PVC"}
            onClick={() => {
              context?.setComputerDifficulty(6);
            }}
          >
            <span className="diff-word">Easy</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M12,1A11,11,0,1,0,23,12,11.013,11.013,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9.01,9.01,0,0,1,12,21Zm4.632-6.775a1,1,0,0,1,.143,1.407A6.036,6.036,0,0,1,12,18a1,1,0,0,1,0-2,4.045,4.045,0,0,0,3.225-1.632A1,1,0,0,1,16.632,14.225ZM18,8a1,1,0,0,1,1,1,4,4,0,0,1-4,4,2,2,0,0,1-2-2V10H11v1a2,2,0,0,1-2,2A4,4,0,0,1,5,9,1,1,0,0,1,6,8h4a1,1,0,0,1,1,1h2a1,1,0,0,1,1-1Z" />
            </svg>
          </Link>
        </div>
        <div className="menu-item hard">
          <Link
            to={"/PVC"}
            onClick={() => {
              context?.setComputerDifficulty(8);
            }}
          >
            <span className="diff-word">Hard</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M15,16.582C15,17.7,13.185,19,12,19s-3-1.3-3-2.418a1,1,0,0,1,1.97-.244A2.344,2.344,0,0,0,12.005,17a2.366,2.366,0,0,0,1.025-.662,1,1,0,0,1,1.97.244ZM23,12A11,11,0,1,1,12,1,11.013,11.013,0,0,1,23,12ZM17,7a3,3,0,1,0,3,3A3,3,0,0,0,17,7ZM12,3A8.955,8.955,0,0,0,6.26,5.075,4.87,4.87,0,0,1,7,5a5.009,5.009,0,0,1,4.9,4h.2A5.009,5.009,0,0,1,17,5a4.87,4.87,0,0,1,.74.075A8.955,8.955,0,0,0,12,3ZM4,10A3,3,0,1,0,7,7,3,3,0,0,0,4,10Zm16.933,3.05A4.978,4.978,0,0,1,12.1,11h-.2a4.978,4.978,0,0,1-8.832,2.05,8.994,8.994,0,0,0,17.866,0Z" />
            </svg>
          </Link>
        </div>
        <div className="menu-item very-hard">
          <Link
            to={"/PVC"}
            onClick={() => {
              context?.setComputerDifficulty(20);
            }}
          >
            <span className="diff-word">Very Hard</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M7.105,9.553a1,1,0,0,1,1.342-.448l2,1a1,1,0,0,1-.894,1.79l-2-1A1,1,0,0,1,7.105,9.553Zm8.448-.448-2,1a1,1,0,0,0,.894,1.79l2-1a1,1,0,1,0-.894-1.79Zm-.328,5.263a4,4,0,0,1-6.45,0,1,1,0,0,0-1.55,1.264,6,6,0,0,0,9.55,0,1,1,0,1,0-1.55-1.264ZM23,2V12A11,11,0,0,1,1,12V2a1,1,0,0,1,1.316-.949l4.229,1.41a10.914,10.914,0,0,1,10.91,0l4.229-1.41A1,1,0,0,1,23,2ZM21,12a9,9,0,1,0-9,9A9.029,9.029,0,0,0,21,12Z" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DifficultySelection;
