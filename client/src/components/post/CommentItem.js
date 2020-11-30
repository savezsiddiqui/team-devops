import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeComment } from '../../actions/post';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

const CommentItem = ({
    auth,
    postId,
    comment: { _id, name, avatar, text, user, date },
    removeComment
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
                {!auth.loading && user === auth.user._id && (
                    <button
                        onClick={() => removeComment(postId, _id)}
                        type='button'
                        className='btn btn-danger'
                    >
                        <i className="far fa-trash-alt" />
                    </button>
                )}
            </div>
        </div>
    )
}

CommentItem.propTypes = {
    removeComment: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    comment: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, { removeComment })(CommentItem);
