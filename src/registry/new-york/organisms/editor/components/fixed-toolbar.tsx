import React from 'react'
import BlockquoteButton from './blockquote-button'
import BoldButton from './bold-button'
import FileButton from './file-button'
import HighlightButton from './highlight-button'
import HistoryButtons from './history-buttons'
import ImageButton from './image-button'
import ItalicButton from './italic-button'
import LinkButton from './link-button'
import ListButton from './list-button'
import PreviewButton from './preview-button'
import StrikeButton from './strike-button'
import TableButton from './table-button'
import TextAlignButton from './text-align-button'
import TextColorButton from './text-color-button'
import TextStyleButton from './text-style-button'
import ToolbarSeparator from './toolbar-separator'
import UnderlineButton from './underline-button'
import YoutubeButton from './youtube-button'
import ZoomButton from './zoom-button'

// Component
const FixedToolbar = React.memo(() => {
  // Template
  return (
    <div className='flex flex-wrap items-center gap-1 border-input border-b p-4'>
      <HistoryButtons />
      <ToolbarSeparator />

      <BoldButton />
      <ItalicButton />
      <UnderlineButton />
      <StrikeButton />
      <BlockquoteButton />
      <ToolbarSeparator />

      <TextStyleButton />
      <TextAlignButton />
      <TextColorButton />
      <HighlightButton />
      <ToolbarSeparator />

      <LinkButton />
      <ListButton />
      <TableButton />
      <YoutubeButton />
      <ImageButton />
      <FileButton />
      <ToolbarSeparator />

      <ZoomButton />
      <PreviewButton />
    </div>
  )
})

FixedToolbar.displayName = 'FixedToolbar'
export default FixedToolbar
