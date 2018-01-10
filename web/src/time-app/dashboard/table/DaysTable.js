import React from 'react'
import { eachDay, startOfMonth, endOfMonth, format } from 'date-fns'

import './DaysTable.css'

const DAY_OF_MONTH = 'DD'
const DAY_NAME = 'dd'

const renderHeadCell = day => (
  <th key={day} className="head-cell">
    <span className="bold">{format(day, DAY_OF_MONTH)}</span>
    <span>{format(day, DAY_NAME)}</span>
  </th>
)

const renderHead = (daysInMonth) => (
  <thead>
    <tr>
      {daysInMonth.map(renderHeadCell)}
    </tr>
  </thead>
)

const DaysTableComponent = ({ daysInMonth }) => (
  <table className="aui days-table">
    {renderHead(daysInMonth)}
    <tbody>
      <tr>
        {/* render rows here */}
      </tr>
    </tbody>
  </table>
)

export class DaysTable extends React.Component {
  state = { daysInMonth: [] }

  componentDidMount() {
    // const { date } = this.props
    const date = new Date() // temporary
    const daysInMonth = eachDay(startOfMonth(date), endOfMonth(date))
    this.setState({ daysInMonth })
  }

  render() {
    const { daysInMonth } = this.state
    return <DaysTableComponent {...this.props} daysInMonth={daysInMonth} />
  }
}
