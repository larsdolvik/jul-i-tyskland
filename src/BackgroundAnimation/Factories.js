import React from 'react'
import PropTypes from 'prop-types'
import { Container, Sprite } from '@inlet/react-pixi'
import * as utils from './utils'
import factory001 from './assets/factory001.png'
import factory002 from './assets/factory002.png'

const allFactories = [{ src: factory001, w: 626, h: 627, x:0, y:200 }, { src: factory002, w: 626, h: 627, x:0, y:200 }]

export default class Factories extends React.PureComponent {

    constructor() {
        super()
        this.state = { factories: [] }
        this.removeFactory = this.removeFactory.bind(this)
        this.makeFactory = this.makeFactory.bind(this)
        this.makeFactories = this.makeFactories.bind(this)
    }
    componentDidUpdate(prevProps){
        if(prevProps.numFactor!==this.props.numFactor){
            this.makeFactories()
        }
     }
    componentDidMount() {
        this.makeFactories()
        this.props.app.ticker.add(this.tick)
    }
    componentWillUnmount() {
        this.props.app.ticker.remove(this.tick)
    }
    tick = delta => {
        const factories = this.state.factories.map((factory) => {
            const speed = 0.5 * delta
            factory.x = factory.x - speed
            if (factory.x + factory.w <= 0) {
                factory.x = utils.makeRandom(window.innerWidth, 10)
            }
            return factory
        })
        this.setState({ factories })
    }
    // TODO ?
    removeFactory() { }

    makeFactory(currentFactory, index) {
        const scale =  0.3 + Math.random() * 0.3
        const { src, w, h } = currentFactory
        const x = Math.round(utils.makeRandom(100, window.innerWidth) + 200 * index)
        const y = currentFactory.y + Math.random() * 10
        const name = `factoryMovieClip${index}`
        const factory = {src,w,h,scale,name,x,y}
        return factory
    }
    makeFactories() {
        const factories = []
        const { numFactor } = this.props
        const perc = 100-(100*numFactor)
        const numFactories = Math.floor( perc/ 1)
        for (let i = 0; i < numFactories; i++) {
            const currentFactory = allFactories[Math.floor(Math.random() * allFactories.length)]
            factories.push(this.makeFactory(currentFactory, i))
        }
        factories.sort((a, b) => a.scale - b.scale)
        this.setState({ factories })
    }
    renderFactories() {
        return this.state.factories.map(factory => {
            const { name, src, scale, x, y } = factory
            return (<Sprite key={name} image={src} scale={[scale, scale]} x={x} y={y} anchor={[0.5, 1]}/>)
        })
    }
    render() {
        const { app } = this.props
        const { renderer } = app
        const { view } = renderer
        const { height } = view
        return (<Container y={height - 300}>{this.renderFactories()}</Container>)

    }
}

Factories.propTypes = {
    app: PropTypes.object,
    numFactor: PropTypes.number,
}

Factories.defaultProps = {
    numFactor: 0,
}