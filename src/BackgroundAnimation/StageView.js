import React, { PureComponent } from 'react'
import { Stage, Container, AppConsumer } from '@inlet/react-pixi'
import MovieClip from './MovieClip'
import styles from './styles.css'

const size = [1920, 1080];
const stageOptions = { transparent: true, resizeTo: window }

export default class StageView extends PureComponent {
    render() {
        return (<Stage
            className={styles.pixiStage}
            width={size[0]}
            height={size[1]}
            options={stageOptions}
        >
            <Container x={0} y={50}>
                <AppConsumer>
                    {app => <MovieClip app={app} {...this.props} />}
                </AppConsumer>
            </Container>
        </Stage>)
    }
}