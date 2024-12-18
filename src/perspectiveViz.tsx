/* eslint-disable no-magic-numbers */
import '@finos/perspective-viewer/dist/esm/perspective-viewer.inline.js'
import '@finos/perspective-viewer-datagrid'
import '@finos/perspective-viewer-d3fc'
import '@finos/perspective-viewer/dist/css/pro.css'
import '@finos/perspective-viewer/dist/css/pro-dark.css'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import perspective from '@finos/perspective/dist/esm/perspective.inline.js'
import type { HTMLPerspectiveViewerElement } from '@finos/perspective-viewer'
import {
  Client,
  Table,
} from '@finos/perspective-viewer/dist/pkg/perspective-viewer.js'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Stack from '@mui/system/Stack'
import { useEffect, useRef, useState } from 'react'

export interface TableFormat {
  /** Data to be displayed in the table. */
  data: Array<Record<string, string | number>>
}

function PerspectiveViz(props: TableFormat) {
  const viewerRef = useRef<HTMLPerspectiveViewerElement | null>(null)
  const rusticTheme = useTheme()
  const [hasError, setHasError] = useState<boolean>(false)
  const currentTheme = rusticTheme.palette.mode
  const perspectiveTheme = currentTheme === 'dark' ? 'Pro Dark' : 'Pro Light'

  useEffect(() => {
    perspective
      .worker()
      .then((worker: Client) => {
        return worker.table(props.data)
      })
      .then((table: Table) => {
        const viewer = viewerRef.current
        if (viewer) {
          viewer.load(table).then(() => {
            viewer
              .restore({
                group_by: ['region', 'state'],
                split_by: ['category', 'subCategory'],
                aggregates: { sales: 'any', profit: 'any' },
                columns: ['sales', 'profit'],
                theme: perspectiveTheme,
                settings: false,
              })
              .then(() => {
                viewer.getView().then((view) => view.set_depth(0))
              })
          })
        }
      })
      .catch(() => {
        setHasError(true)
      })
  }, [])

  if (hasError) {
    return (
      <Typography variant="body2">Failed to create table from data.</Typography>
    )
  } else {
    return (
      <Stack direction="column" width="800px" height="800px">
        <perspective-viewer
          ref={viewerRef}
          style={{ width: '100%', height: '100%', overflow: 'auto' }}
        ></perspective-viewer>
      </Stack>
    )
  }
}

export default PerspectiveViz
