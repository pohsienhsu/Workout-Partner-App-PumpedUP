import React from 'react'
import { CheckBox } from "react-native-elements"

const beaconCheckBox = ({ option, state, setState, containerStyle}) => {
  return (
    <CheckBox
      title={option}
      checkedIcon='dot-circle-o'
      uncheckedIcon='circle-o'
      checkedColor="#313A3A"
      containerStyle={containerStyle}
      checked={state[option]}
      onPress={() =>
        state[option] ? setState({ ...state, [option]: false }) : setState({ ...state, [option]: true })
      }
    />
  )
}

export default beaconCheckBox 