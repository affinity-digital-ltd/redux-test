import { Component } from 'react'
import {connect} from 'react-redux'
import {fetchWeather} from '../store'
import Link from 'next/link'

class Index extends Component {
  static async getInitialProps ({ reduxStore, req }) {
    await reduxStore.dispatch(fetchWeather())

    return {}
  }

  render () {
    if (this.props.loading) {
      return <div>LOADING</div>
    } else {
      return <div>
        <Link href='/index2'><a>LINK</a></Link>
        Weather
        <div dangerouslySetInnerHTML={{__html: JSON.stringify(this.props.weather) }}/>
      </div>
    }
  }
}

function mapStateToProps (state) {
  const { weather, loading } = state
  return { weather, loading }
}

export default connect(mapStateToProps)(Index)
