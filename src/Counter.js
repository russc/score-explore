import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { increase, decrease } from './actions'

const mapStateToProps = (state) => {
  return {
    count: state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onIncrease: () => {
      dispatch(increase())
    },
    onDecrease: () => {
      dispatch(decrease())
    }
  }
}

const Counter = ({ onIncrease, onDecrease, count }) => (
  <div>
    <button onClick={onIncrease}>+</button>
    {count}
    <button onClick={onDecrease}>-</button>
  </div>
)

Counter.propTypes = {
  onIncrease: PropTypes.func.isRequired,
  onDecrease: PropTypes.bool.isRequired,
  count: PropTypes.string.isRequired
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter)