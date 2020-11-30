import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPosts } from '../../actions/post';
import Spinner from '../layout/Spinner';
import PostForm from './PostForm';
import PostItem from './PostItem';

const Posts = ({ post: { posts, loading }, getPosts, isAuthenticated }) => {

    useEffect(() => {
        if (isAuthenticated) getPosts();
    }, [isAuthenticated, getPosts]);

    const [searchTerm, setSearchTerm] = useState('');
    posts = posts.filter(({text}) => {
        let t = text.toLowerCase();
        let s = searchTerm.toLowerCase();
        return t.includes(s);
    });

    return loading ? <Spinner /> :
        <>
            <h1 className="large text-primary">Posts</h1>
            <p className="lead">
                <i className="fas fa-user" /> Welcome to the community
            </p>
            <PostForm />

            <div className='form'>
                <div className='form-group'>
                    <input
                        type='text'
                        value={searchTerm}
                        onChange={(e) => { setSearchTerm(e.target.value) }}
                        placeholder='Search Posts by text'
                    />
                </div>
            </div>

            <div className="posts">
                {posts.map((post) => (
                    <PostItem key={post._id} post={post} />
                ))}
            </div>
        </>
}

Posts.propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = (state) => ({
    post: state.post,
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { getPosts })(Posts);
