import * as React from 'react'
import { Dashboard as DashboardIcon } from '@material-ui/icons'

import Can from '@components/Can/Can'
import SectionHeader from '@components/SectionHeader'

const Dashboard: React.FC = () => {

  return (
    <>
      <div>
        <SectionHeader id="dashBoardHeader" icon={<DashboardIcon />} text={'navigation.Dashboard'} />
        <main role="contentinfo" className="content">
          <Can
            perform="dashboard-page:visit"
            yes={() => <h2>User can do it</h2>}
            no={() => <h2>Access denied</h2>}
          />
        </main>
      </div>
    </>
  )
}

export default Dashboard
