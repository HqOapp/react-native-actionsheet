import React from 'react'
import PropTypes from 'prop-types'
import {ActionSheetIOS} from 'react-native'

const optionNames = [
  'title',
  'message',
  'options',
  'tintColor',
  'cancelButtonIndex',
  'destructiveButtonIndex',
  'anchor'
]

function isArray (obj) {
  return Object.prototype.toString.call(obj) === '[object Array]'
}

class ActionSheet extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      displayOnUpdate: false
    }
  }

  componentDidUpdate () {
    if (this.state.displayOnUpdate === true) {
      this.display()
    }
  }

  show () {
    this.setState({ displayOnUpdate: true })
  }

  hide () {
    this.setState({ displayOnUpdate: false })
  }

  display () {
    if (this.state.displayOnUpdate === true) {
      let props = this.props
      if (!(props && props.title && isArray(props.options) && props.options.length > 0)) {
        return
      }
      let options = optionNames.reduce((obj, name, index) => {
        if (typeof props[name] !== 'undefined' && props[name] !== null) obj[name] = props[name]
        return obj
      }, {})
      ActionSheetIOS.showActionSheetWithOptions(options, props.onPress)
      this.setState({ displayOnUpdate: false })
    }
  }

  render () {
    return null
  }
}

ActionSheet.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  options: PropTypes.array.isRequired,
  tintColor: PropTypes.string,
  cancelButtonIndex: PropTypes.number,
  destructiveButtonIndex: PropTypes.number,
  onPress: PropTypes.func,
  anchor: PropTypes.object
}

ActionSheet.defaultProps = {
  onPress: () => {}
}

export default ActionSheet
