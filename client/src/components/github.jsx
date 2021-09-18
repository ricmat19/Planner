import React, { useEffect, useRef, useState } from 'react';
import GitHubAPI from '../apis/githubAPI';

const GitHubC = () => {

    const [username, setUsername] = useState(process.env.REACT_APP_GITHUB_USERNAME);
    const [repos, setRepos] = useState([]);
    const [userDisplay, setUserDisplay] = useState(false);
    const [user, setUser] = useState([]);

    useEffect(() => {
        const fetchData = async (req, res) => {
            try{

                const githubRepoResponse = await GitHubAPI.get("https://api.github.com/users/" + username + "/repos")
                
                setRepos(githubRepoResponse.data)

                const githubUserResponse = await GitHubAPI.get("https://api.github.com/users/" + username)

                setUser(githubUserResponse.data)

            }catch(err){
                console.log(err);
            }
        }
        fetchData();
    }, []);

    const displayRepos = async (e) =>{
        setUserDisplay(false)
    }

    const displayUser = async (e) =>{
        setUserDisplay(true)
    }

    return(
        <div className="main-body">
            <div className="title">GitHub</div>
            <div className="grid github-nav">
                    <div className="sub-title" onClick={displayRepos}>Repos</div>
                    <div className="sub-title" onClick={displayUser}>User</div>
            </div>
            <div className="repo-list">
                {userDisplay ?
                    <div>
                        <div className="github-user-info-div">
                            <label className="align-left">Name</label>
                            <div className="align-right">{user.name}</div>
                        </div>
                        <hr/>
                        <div className="github-user-info-div">
                            <label className="align-left">Location</label>
                            <div className="align-right">{user.location}</div>
                        </div>
                        <hr/>
                        <div className="github-user-info-div">
                            <label className="align-left">GitHub</label>
                            <a className="align-right" href={user.html_url} target="_blank"><div>Link</div></a>
                        </div>
                        <hr/>
                        <div className="github-user-info-div">
                            <label className="align-left">Website</label>
                            <a className="align-right" href={user.blog} target="_blank"><div>Link</div></a>
                        </div>
                        <hr/>
                        <div className="github-user-info-div">
                            <label className="align-left"># of Repos</label>
                            <div className="align-right">{user.public_repos}</div>
                        </div>
                    </div>
                :
                    repos.map(repo => {
                        return(
                            <div key={repo.id} >
                                <div className="github-repo-div">
                                    <div className="align-left min-width">{repo.name}</div>
                                    <div className="align-left">{repo.language}</div>
                                    <a className="align-right" href={repo.html_url} target="_blank">
                                        <div className="align-right">Repo</div>
                                    </a>
                                </div>
                                <hr/>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default GitHubC;