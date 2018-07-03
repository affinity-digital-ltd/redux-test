import { Component } from 'react'
import {connect} from 'react-redux'
import {fetchWeather} from '../store'
import Link from 'next/link'

class Index2 extends Component {
  componentDidMount () {
    const {dispatch} = this.props
    dispatch(fetchWeather())
  }

  render () {
    if (this.props.loading) {
      return <div>LOADING</div>
    } else {
      return <div>
        <Link href='/'><a>LINK2</a></Link>
        Weather2
        <div dangerouslySetInnerHTML={{__html: JSON.stringify(this.props.weather) }}/>
      </div>
    }
  }
}

function mapStateToProps (state) {
  const { weather, loading } = state
  return { weather, loading }
}

export default connect(mapStateToProps)(Index2)
