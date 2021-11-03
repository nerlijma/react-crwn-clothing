import React from 'react'
import MenuItem from '../menu-item/menu-item.component'
import { selectDirectorySections } from '../../redux/directory/directory.selectors'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

const Directory = ({ sections }) => (

    <div className='directory-menu'>
        {sections.map(({ id, ...otherProps }) => <MenuItem key={id} {...otherProps} />)}
    </div>

)

const mapStateToProps = createStructuredSelector({
    sections: selectDirectorySections
})

export default connect(
    mapStateToProps,
    null
)(Directory);