import React from "react";

import "./styles/BadgesList.css";
import { Link } from "react-router-dom";

import Gravatar from "./gravatar";
class BadgesListItem extends React.Component {
  render() {
    return (
      <div className="BadgesListItem">
        <Gravatar
          className="BadgesListItem__avatar"
          email={this.props.badge.email}
          alt={`${this.props.badge.firstName} ${this.props.badge.lastName}`}
        />

        <div>
          <strong>
            {this.props.badge.firstName} {this.props.badge.lastName}
          </strong>
          <br />@{this.props.badge.twitter}
          <br />
          {this.props.badge.jobTitle}
        </div>
      </div>
    );
  }
}

function filtradoUsuarios(badges) {
  const [query, setQuery] = React.useState("");
  const [filtro, setFiltro] = React.useState(badges);

  React.useMemo(() => {
    const result = badges.filter((badge) => {
      return badge.firstName.toLowerCase().includes(query.toLowerCase());
    });
    setFiltro(result);
  }, [badges, query]);
  return { query, filtro, setQuery };
}

function BadgesList(props) {
  const badges = props.badges;

  const { query, filtro, setQuery } = filtradoUsuarios(badges);

  if (filtro.length === 0) {
    return (
      <div>
        <div className="form-group">
          <label>Filtro de usuarios</label>
          <input
            type="text"
            className="form-control"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <h3>No hay resultados</h3>
      </div>
    );
  }
  return (
    <div className="BadgesList">
      <div className="form-group">
        <label>Filtro de usuarios</label>
        <input
          type="text"
          className="form-control"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <ul className="list-unstyled">
        {filtro
          .slice(0)
          .reverse()
          .map((badge) => {
            return (
              <li key={badge.id}>
                <Link
                  className="text-reset text-decoration-none"
                  to={`badges/${badge.id}`}
                >
                  <BadgesListItem badge={badge} />
                </Link>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default BadgesList;
