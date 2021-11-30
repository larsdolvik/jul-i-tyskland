import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Container } from '@inlet/react-pixi'
import Grassfield from './Grassfield'
import Trees from './Trees'
import Factories from './Factories'

export default class MovieClip extends PureComponent {
    render() {
        const {app, ...props} = this.props
        return (
            <Container>
                <Trees app={app} {...props} />
                <Factories app={app} {...props}  />
                <Grassfield app={app} {...props}/>
                <Trees fod="near" app={app} {...props} />
            </Container>)
    }
}
MovieClip.propTypes={
    app:PropTypes.object,
}