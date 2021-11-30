import React from 'react'
import PropTypes from 'prop-types'
import { TilingSprite, Container } from '@inlet/react-pixi'

import grassfield from './assets/grassfield.jpg'


export default class Grassfield extends React.PureComponent {

    constructor() {
        super()
        this.state = {
            tilePosition: { x: 0, y: 0 },
        }
    }
    componentDidMount() {
        this.props.app.ticker.add(this.tick)
    }
    componentWillUnmount() {
        this.props.app.ticker.remove(this.tick)
    }
    tick = delta => {
        this.setState(state => ({
            tilePosition: {
                x: state.tilePosition.x - 1 * delta
            }
        }))
    }
    render() {
        const { app, numFactor } = this.props
        const { renderer } = app
        const { view } = renderer
        const { width, height } = view

        return (<Container>
            <TilingSprite
                image={grassfield}
                x={0}
                y={height - 196}
                tilePosition={this.state.tilePosition}
                width={width}
                height={196} />
            <TilingSprite
                alpha={1-numFactor} 
                image={grassfield}
                x={0}
                y={height - 196}
                tilePosition={this.state.tilePosition}
                width={width}
                height={196} />
        </Container>

        )
    }
}

Grassfield.propTypes = {
    app: PropTypes.object,
    numFactor: PropTypes.number,
}