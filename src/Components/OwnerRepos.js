import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';

const OwnerRepos = () => {
    const { owner } = useParams();
    const [repos, setRepos] = useState([]);
    const favorites = useSelector(state => state.favorites);
    const dispatch = useDispatch();

    useEffect(() => {
        const getRepos = async () => {
            try {
                const response = await fetch(`https://api.github.com/repositories?per_page=30&page=1`);
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                setRepos(data.filter(repo => repo.owner.login === owner)); // Filter repos by owner
            } catch (error) {
                console.error('Fetching error: ', error);
            }
        };

        getRepos();
    }, [owner]);

    const toggleFavorite = (repoId) => {
        dispatch({ type: 'TOGGLE_FAVORITE', payload: repoId });
    };

    return (
        <div className="container">
            <h2>Repositories by {owner}</h2>
            {repos.length === 0 ? (
                <p>No repositories found.</p>
            ) : (
                repos.map((repo) => (
                    <div className="card_item" key={repo.id}>
                        <div className="card_inner">
                            <h3 className="repoName">
                                <Link to={`/repo/${repo.owner.login}/${repo.name}`}>{repo.name}</Link>
                            </h3>
                            <p className="repoDescription">{repo.description}</p>
                            <div className="repoUrl">
                                <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                                    {repo.html_url}
                                </a>
                            </div>
                            <div
                                className={`favorite-icon ${favorites.includes(repo.id) ? 'favorited' : ''}`}
                                onClick={() => toggleFavorite(repo.id)}
                            >
                                <FontAwesomeIcon icon={faHeart} />
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default OwnerRepos;
