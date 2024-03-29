import React, { useEffect, useState } from "react";
import GitHubAPI from "../apis/githubAPI";
import PropTypes from "prop-types";

const GitHubC = (props) => {
  const [username] = useState(process.env.REACT_APP_GITHUB_USERNAME);
  const [repos, setRepos] = useState([]);
  const [userDisplay, setUserDisplay] = useState(false);
  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (props.githubModal === "modal modal-active") {
          ///Get repo data from GitHub API
          const githubRepoResponse = await GitHubAPI.get(
            "https://api.github.com/users/" + username + "/repos"
          );
          setRepos(githubRepoResponse.data);
          //Get user data from GitHub API
          const githubUserResponse = await GitHubAPI.get(
            "https://api.github.com/users/" + username
          );
          setUser(githubUserResponse.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [props.githubModal]);

  const displayRepos = async () => {
    setUserDisplay(false);
  };

  const displayUser = async () => {
    setUserDisplay(true);
  };

  return (
    <div>
      <div className="title">GitHub</div>
      <div>
        <div className="grid github-nav">
          <div className="sub-title" onClick={displayRepos}>
            Repos
          </div>
          <div className="sub-title" onClick={displayUser}>
            User
          </div>
        </div>
        <div className="search-results-container">
          {userDisplay ? (
            <div>
              <div className="grid github-user-info-div">
                <label className="align-left">Name</label>
                <div className="align-right">{user.name}</div>
              </div>
              <hr />
              <div className="grid github-user-info-div">
                <label className="align-left">Location</label>
                <div className="align-right">{user.location}</div>
              </div>
              <hr />
              <div className="grid github-user-info-div">
                <label className="align-left">GitHub</label>
                <a
                  className="align-right"
                  href={user.html_url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div>Link</div>
                </a>
              </div>
              <hr />
              <div className="grid github-user-info-div">
                <label className="align-left">Website</label>
                <a
                  className="align-right"
                  href={user.blog}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div>Link</div>
                </a>
              </div>
              <hr />
              <div className="grid github-user-info-div">
                <label className="align-left"># of Repos</label>
                <div className="align-right">{user.public_repos}</div>
              </div>
            </div>
          ) : (
            repos.map((repo) => {
              return (
                <div key={repo.id}>
                  <div className="github-repo-div">
                    <div className="align-left">{repo.name}</div>
                    <div className="align-left">{repo.language}</div>
                    <a
                      className="align-right"
                      href={repo.html_url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <div className="align-right">Repo</div>
                    </a>
                  </div>
                  <hr />
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

GitHubC.propTypes = {
  githubModal: PropTypes.string,
};

export default GitHubC;
