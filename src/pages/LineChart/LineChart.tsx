import React from 'react'
import io from 'socket.io-client'
import Plotly, { Layout } from 'plotly.js'
import { debounce } from 'lodash-es'
import { connect } from 'react-redux'
import { ShowChart as ShowChartIcon } from '@material-ui/icons'

import { showNotificationAction } from '@store/notification/notification.actions'
import { IDispatch } from '@src/interfaces'
import { getCssVar } from '@src/helpers/getCssVar'
import SectionHeader from '@components/SectionHeader'

const chartId = 'lineChart'

class LineChart extends React.PureComponent<IDispatch, null> {
  private readonly handleResize = () => {
    Plotly.Plots.resize(chartId)
  }

  socket = null
  onResizeDebounced = debounce(this.handleResize, 300)

  layout: Partial<Layout> = {
    showlegend: true,
    paper_bgcolor: getCssVar('white'),
    plot_bgcolor: getCssVar('white'),
    hovermode: 'closest',
    xaxis: {
      type: 'date',
      color: getCssVar('textPrimary'),
    },
    yaxis: {
      color: getCssVar('textPrimary'),
      title: 'USD/RUB',
      titlefont: { color: getCssVar('textPrimary') },
    },
  }

  componentDidMount(): void {
    const { dispatch } = this.props
    window.addEventListener('resize', this.onResizeDebounced)

    this.socket = io(process.env.BACKEND_WEBSOCKET_URL)

    this.socket.on('connect', this.onConnect)

    this.socket.on('connect_error', (error) => {
      dispatch(showNotificationAction(error))
    })

    this.socket.on('reconnect', (error) => {
      dispatch(showNotificationAction(error))
    })

    this.socket.on('lineChartDataInit', (data) => {
      this.renderChart(data)
    })

    this.socket.on('lineChartDataOnline', (data) => {
      this.updateChart(data)
    })
  }

  componentWillUnmount(): void {
    this.socket.off('connect')
    this.socket.off('connect_error')
    this.socket.off('reconnect')
    this.socket.off('lineChartDataInit')
    this.socket.off('lineChartDataOnline')
    this.socket.disconnect()
    window.removeEventListener('resize', this.onResizeDebounced)
  }

  onConnect = () => {
    const { dispatch } = this.props
    this.socket.emit('chart', { chart: 'line' }, (error) => {
      dispatch(showNotificationAction(error))
    })
  }

  renderChart = (response) => {
    const { dispatch } = this.props
    Plotly.newPlot(chartId, [response], this.layout)
      .catch((error) => {
        dispatch(showNotificationAction(error))
      })
  }

  updateChart = (response) => {
    const { dispatch } = this.props
    // 100 - how much elements store in data
    // there is an error in the description for types in @types/plotly.js
    // @ts-ignore
    Plotly.extendTraces(chartId, response, [0], 100)
      .catch((error) => {
        dispatch(showNotificationAction(error))
      })
  }

  render() {
    return (
      <>
        <SectionHeader id="lineChartHeader" icon={<ShowChartIcon />} text={'navigation.Line Chart'} />
        <main role="contentinfo" className="content">
          <div id={chartId}></div>
        </main>
      </>
    )
  }
}

export default connect(
  null,
  null,
)(LineChart)
