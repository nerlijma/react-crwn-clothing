import React from 'react'
import MenuItem from '../menu-item/menu-item.component'
import SectionsData from './directory.data.json'

class Directory extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            sections: SectionsData
        }
    }

    render() {
        return (
            <div className='directory-menu'>
                {this.state.sections.map(({ id, ...otherProps }) => <MenuItem key={id} {...otherProps} />)}
            </div>
        )
    }
}

export default Directory;