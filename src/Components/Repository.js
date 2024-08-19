import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';

const Repository = () => {
    const [repos, setRepos] = useState([]);
    const favorites = useSelector(state => state.favorites);
    const dispatch = useDispatch();

    const getRepos = async () => {
        try {
            const response = await fetch("https://api.github.com/repositories?per_page=30&page=1");
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            setRepos(data);
        } catch (error) {
            console.error('Fetching error: ', error);
        }
    };

    useEffect(() => {
        getRepos();
    }, []);

    const toggleFavorite = (repoId) => {
        dispatch({ type: 'TOGGLE_FAVORITE', payload: repoId });
    };

    return (
        <div className="container">
            {repos.map((repo) => (
                <div className="card_item" key={repo.id}>
                    <div className="card_inner">
                        <img src={repo.owner.avatar_url} alt={`Avatar of ${repo.owner.login}`} className="repo-owner-avatar" />
                        <div className="repo-details">
                            <h3 className="repoName">
                                <Link to={`/repo/${repo.owner.login}/${repo.name}`}>{repo.name}</Link>
                            </h3>
                            <p className="repoDescription">{repo.description}</p>
                            <div className="repoUrl">
                                <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                                    {repo.html_url}
                                </a>
                            </div>
                            <div className="detail-box">
                                <Link to={`/owner/${repo.owner.login}`}>
                                    <button className="view-repos-button">View Repositories</button>
                                </Link>
                            </div>
                        </div>
                        <div
                            className={`favorite-icon ${favorites.includes(repo.id) ? 'favorited' : ''}`}
                            onClick={() => toggleFavorite(repo.id)}
                        >
                            <FontAwesomeIcon icon={faHeart} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Repository;
