import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { likePost, unlikePost, deletePost } from '../../actions/post';

const PostItem = ({
    likePost,
    unlikePost,
    deletePost,
    auth,
    showActions,
    post: { _id, text, name, avatar, user, likes, comments, date }
}) => {
    return (
        <div className='post bg-white p-1 my-1'>
            <div>
                <Link to={`/profile/${user}`}>
                    <img className='round-img' src={avatar} alt='' />
                    <h4>{name}</h4>
                </Link>
            </div>
            <div>
                <p className='my-1'>{text}</p>
                <p className='post-date'>
                    Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
                </p>
                {
                    showActions && <>
                        <button
                            onClick={() => likePost(_id)}
                            type='button'
                            className='btn btn-light'
                        >
                            <i className='fas fa-thumbs-up' />{' '}
                            <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
                        </button>
                        <button
                            onClick={() => unlikePost(_id)}
                            type='button'
                            className='btn btn-light'
                        >
                            <i className='fas fa-thumbs-down' />
                        </button>
                        <Link to={`/posts/${_id}`} className='btn btn-primary'>
                            Discussion{' '}
                            {comments.length > 0 && (
                                <span className='comment-count'>{comments.length}</span>
                            )}
                        </Link>
                        {!auth.loading && user === auth.user._id && (
                            <button
                                onClick={() => deletePost(_id)}
                                type='button'
                                className='btn btn-danger'
                            >
                                <i className="far fa-trash-alt" />
                            </button>
                        )}
                    </>
                }
            </div>
        </div>
    )
}

PostItem.defaultProps = {
    showActions: true
}

PostItem.propTypes = {
    auth: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
    likePost: PropTypes.func.isRequired,
    unlikePost: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, { likePost, unlikePost, deletePost })(PostItem);
