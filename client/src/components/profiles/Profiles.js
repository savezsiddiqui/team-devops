import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfiles } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';

const Profiles = ({ profile: { profiles, loading }, getProfiles }) => {
    useEffect(() => {
        getProfiles();
    }, [getProfiles]);

    // console.log(profiles);
    const [searchTerm, setSearchTerm] = useState('');
    profiles = profiles.filter(({ user: { name } }) => {
        let n = name.toLowerCase();
        let s = searchTerm.toLowerCase();
        return n.includes(s);
    });

    return (
        <>
            {loading ? <Spinner /> :
                <>
                    <h1 className='large text-primary'>Developers</h1>
                    <p className='lead'>
                        <i className='fab fa-connectdevelop'></i>
                        Browse and connect with developers.
                    </p>

                    <div className='form'>
                        <div className='form-group'>
                            <input
                                type='text'
                                value={searchTerm}
                                onChange={(e) => { setSearchTerm(e.target.value) }}
                                placeholder='Search Profiles'
                            />
                        </div>
                    </div>


                    <div className='profiles'>
                        {profiles.length > 0 ? (
                            profiles.map((profile) => (
                                <ProfileItem key={profile._id} profile={profile} />
                            ))
                        ) :
                            <h4>No profiles found </h4>}
                    </div>
                </>
            }
        </>
    )
}

Profiles.propTypes = {
    profile: PropTypes.object.isRequired,
    getProfiles: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    profile: state.profile
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
