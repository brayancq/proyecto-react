import React from "react";
import { Link } from "react-router-dom";

import "./styles/Badges.css";
import confLogo from "../images/logo2.svg";
import BadgesList from "../components/BadgesList";

import NotFound from "../pages/NotFound";
import api from "../api";
import "./styles/Skeleton.css";
class Badges extends React.Component {
  state = {
    loading: true,
    error: null,
    data: undefined,
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    this.setState({ loading: true, error: null });
    try {
      const data = await api.badges.list();
      this.setState({ loading: false, data: data });
    } catch (error) {
      this.setState({ loading: false, error: error });
    }
  };

  render() {
    var error = this.state.error;
    return (
      <React.Fragment>
        <div className="Badges">
          <div className="Badges__hero">
            <div className="Badges__container">
              <img
                className="Badges_conf-logo imgnav"
                src={confLogo}
                alt="Conf Logo"
              />
            </div>
          </div>
        </div>

        <div className="Badges__container">
          <div className="Badges__buttons">
            <Link to="/badges/new" className="btn btn-primary">
              Nuevo registro
            </Link>
          </div>

          <div className="Badges__list">
            <div className="Badges__container">
              {this.state.loading === true ? (
                <li className="skeleton-item">
                  <div>
                    <div className="skeleton-img" />
                  </div>
                  <div className="skeleton-info">
                    <p className="skeleton-name" />
                    <p className="skeleton-email" />
                  </div>
                </li>
              ) : this.state.error ? (
                <NotFound mensaje={error} />
              ) : (
                <BadgesList badges={this.state.data} />
              )}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Badges;
