import React, { useEffect, useRef, useState } from 'react';
import GitHubAPI from '../apis/githubAPI';

const GitHubC = () => {

    const [username, setUsername] = useState(process.env.REACT_APP_GITHUB_USERNAME);
    const [repos, setRepos] = useState([]);

    useEffect(() => {
        const fetchData = async (req, res) => {
            try{

                const githubRepoResponse = await GitHubAPI.get("https://api.github.com/users/" + username + "/repos")
                
                setRepos(githubRepoResponse.data)

                const githubUserResponse = await GitHubAPI.get("https://api.github.com/users/" + username)

                console.log(githubUserResponse)
                

            }catch(err){
                console.log(err);
            }
        }
        fetchData();
    }, []);

    return(
        <div className="main-body">
            {console.log(repos)}
            <div className="title">GitHub Repos</div>
            {repos.map(repo => {
                    return(
                    <div key={repo.id} >
                        <div className="github-repo-div">
                            <div className="align-left min-width">{repo.name}</div>
                            <div className="align-left min-width">{repo.language}</div>
                            <a className="align-right min-width" href={repo.html_url} target="_blank">
                                <div className="align-right min-width">Repository</div>
                            </a>
                        </div>
                        <hr/>
                    </div>
                )
            })}
        </div>
    )
}

export default GitHubC;