import { Color } from '@tiptap/extension-color'
import Highlight from '@tiptap/extension-highlight'
import Link from '@tiptap/extension-link'
import { TaskItem, TaskList } from '@tiptap/extension-list'
import { TableKit } from '@tiptap/extension-table'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import { Placeholder } from '@tiptap/extensions'
import type { Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { AlignCenter, AlignJustify, AlignLeft, AlignRight, type LucideProps } from 'lucide-react'
import type React from 'react'
import CustomImageExtension from './custom-image-extension'
import CustomYoutubeExtension from './custom-youtube-extension'
import FileExtension from './file-extension'

// [T] Alignment
export type Alignment = 'left' | 'center' | 'right' | 'justify'

// [C] Min width
export const MIN_WIDTH = 320

// [C] Extensions
export const EXTENSIONS = [
  StarterKit.configure({
    heading: {
      levels: [1, 2, 3, 4]
    }
  }),
  Underline,
  Highlight.configure({ multicolor: true }),
  Link.configure({ defaultProtocol: 'https', protocols: ['https'], openOnClick: false }),
  Color,
  TaskList,
  TaskItem.configure({
    nested: true
  }),
  TableKit.configure({
    table: { resizable: true, allowTableNodeSelection: true }
  }),
  Placeholder.configure({
    placeholder: 'Enter content'
  }),
  TextAlign.configure({
    types: ['heading', 'paragraph']
  }),
  CustomYoutubeExtension.configure({
    nocookie: true,
    width: MIN_WIDTH,
    height: 180
  }),
  CustomImageExtension,
  FileExtension
  // FileHandler.configure({
  //   allowedMimeTypes: ['image/png', 'image/jpeg', 'image/webp'],
  //   onDrop: (currentEditor, files, pos) => {
  //     files.forEach((file) => {
  //       const fileReader = new FileReader()

  //       fileReader.readAsDataURL(file)
  //       fileReader.onload = () => {
  //         currentEditor
  //           .chain()
  //           .insertContentAt(pos, {
  //             type: 'image',
  //             attrs: {
  //               src: fileReader.result
  //             }
  //           })
  //           .focus()
  //           .run()
  //       }
  //     })
  //   },
  //   onPaste: (currentEditor, files, htmlContent) => {
  //     files.forEach((file) => {
  //       if (htmlContent) {
  //         // if there is htmlContent, stop manual insertion & let other extensions handle insertion via inputRule
  //         // you could extract the pasted file from this url string and upload it to a server for example
  //         console.log(htmlContent)
  //         return false
  //       }

  //       const fileReader = new FileReader()

  //       fileReader.readAsDataURL(file)
  //       fileReader.onload = () => {
  //         currentEditor
  //           .chain()
  //           .insertContentAt(currentEditor.state.selection.anchor, {
  //             type: 'image',
  //             attrs: {
  //               src: fileReader.result
  //             }
  //           })
  //           .focus()
  //           .run()
  //       }
  //     })
  //   }
  // })
]

// [C] Container class name per alignment
export const CONTAINER_CLASS_NAME_PER_ALIGNMENT: Record<Alignment, string> = {
  left: 'justify-start',
  center: 'justify-center',
  right: 'justify-end',
  justify: 'justify-stretch'
}

// [C] Alignments
export const ALIGNMENTS: Array<{
  value: Alignment
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>>
  label: string
  shortcut: string
}> = [
  {
    value: 'left',
    icon: AlignLeft,
    label: 'Align left',
    shortcut: 'Ctrl Shift L'
  },
  {
    value: 'center',
    icon: AlignCenter,
    label: 'Align center',
    shortcut: 'Ctrl Shift E'
  },
  {
    value: 'right',
    icon: AlignRight,
    label: 'Align right',
    shortcut: 'Ctrl Shift R'
  },
  {
    value: 'justify',
    icon: AlignJustify,
    label: 'Align justify',
    shortcut: 'Ctrl Shift J'
  }
]

// [U] Get editor value
export const getEditorValue = (editor: Editor, format: 'html' | 'json' | 'text'): object | string => {
  switch (format) {
    case 'json':
      return editor.getJSON()
    case 'html':
      return editor.isEmpty ? '' : editor.getHTML()
    default:
      return editor.getText()
  }
}
