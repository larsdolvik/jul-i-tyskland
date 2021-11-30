import React from 'react'
import PropTypes from 'prop-types'
import logo from './assets/bbrLogo.png'
import styles from './styles.css'

const airQuality = {
    low: { label: 'Excellent', color: 'green' },
    moderate: { label: 'Good', color: 'orange' },
    high: { label: 'Moderate', color: 'red' },
    veryHigh: { label: 'Bad', color: 'brown' },
    serious: { label: 'Very bad', color: 'black' }
}
const plantedTrees = {
    low: { label: 'No trees', color: 'black' },
    moderate: { label: 'Few trees', color: 'red' },
    high: { label: 'You can do better', color: 'brown' },
    veryHigh: { label: 'Almost there', color: 'orange' },
    serious: { label: 'Congrats!', color: 'green' }
}

const getCurrentPlantedTreesByIndex = airQualityIndex => {
    if (airQualityIndex >= 0 && airQualityIndex <= 3)
        return plantedTrees.serious
    if (airQualityIndex > 3 && airQualityIndex <= 6)
        return plantedTrees.veryHigh
    if (airQualityIndex > 6 && airQualityIndex <= 7)
        return plantedTrees.high
    if (airQualityIndex > 7 && airQualityIndex <= 9)
        return plantedTrees.moderate
    return plantedTrees.low
}

const getCurrentAirQualityByIndex = airQualityIndex => {
    if (airQualityIndex >= 0 && airQualityIndex <= 3)
        return airQuality.low
    if (airQualityIndex > 3 && airQualityIndex <= 6)
        return airQuality.moderate
    if (airQualityIndex > 6 && airQualityIndex <= 7)
        return airQuality.high
    if (airQualityIndex > 7 && airQualityIndex <= 9)
        return airQuality.veryHigh
    return airQuality.serious
}
const Footer = ({ numFactor }) => {
    const ratio = (numFactor * 100) / 10
    const airQualityIndex = 10 - ratio
    const currentAirQuality = getCurrentAirQualityByIndex(airQualityIndex)
    const currentPlantedTrees = getCurrentPlantedTreesByIndex(airQualityIndex)

    return (
        <div className={styles.footer}>
            <div>
                <div className={styles.scoreItem}>
                    <div className={styles.scoreTitle}>Current air quality index</div>
                    <div className={styles.score}>
                        <div>{Math.floor(airQualityIndex.toFixed(2))}</div>
                        <div style={{ backgroundColor: currentAirQuality.color }}>{currentAirQuality.label}</div>
                    </div>
                </div>
            </div>
            <div className={styles.logo}>
                <img src={logo} alt="bbr logo" />
            </div>
            <div>
                <div className={styles.scoreItem}>
                    <div className={styles.scoreTitle}>PLANTED TREES</div>
                    <div className={styles.score}>
                        <div>{50 * ratio}</div>
                        <div style={{ backgroundColor: currentPlantedTrees.color }} >{currentPlantedTrees.label}</div>
                    </div>
                </div>
            </div>
        </div>)
}
Footer.propTypes = {
    numFactor: PropTypes.number,
}

export default Footer