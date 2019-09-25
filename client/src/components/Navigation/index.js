import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";

const Navigation = () => {
  return (
    <div>
      <ul class="nav">
        <li class="nav-item">
          <Link class="nav-link" to={ROUTES.LANDING}>
            Home
          </Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to={ROUTES.HOME}>
            Courses
          </Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to={ROUTES.CREATE_COURSE}>
            Add Course
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
