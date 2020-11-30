import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPost } from '../../actions/post';
import Spinner from '../layout/Spinner';
import PostItem from '../posts/PostItem';
import { Link } from 'react-router-dom';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

const Post = ({
    getPost,
    post: { post, loading },
    match,
    isAuthenticated
}) => {
    useEffect(() => {
        if (isAuthenticated) getPost(match.params.postId);
    }, [getPost, match.params.postId, isAuthenticated])

    return loading || post === null ? <Spinner /> :
        <>
            <Link to='/posts' className='btn'>Back to Posts</Link>
            <PostItem post={post} showActions={false} />
            <CommentForm postId={post._id} />
            <div className='comments'>
                {Array.isArray(post.comments) ? post.comments.map(comment => (
                    <CommentItem
                        comment={comment}
                        postId={post._id}
                        key={comment._id}
                    />
                )) : <p> No comments to display </p>}
            </div>
        </>
}

Post.propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = (state) => ({
    post: state.post,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { getPost })(Post);
