import React from 'react'
import {
  FileUpload,
  FileUploadContent,
  FileUploadInput,
  FileUploadItem,
  type FileUploadProps
} from '@/components/molecules/file-upload'

// Component
export const FileUploadDemo = () => {
  // States
  const [value, setValue] = React.useState<FileUploadProps['value']>([])

  // Template
  return (
    <FileUpload
      value={value}
      dropzoneOptions={{
        maxFiles: 5
      }}
      onValueChange={setValue}
    >
      <FileUploadInput />
      <FileUploadContent>
        {value.map((item, index) => (
          <FileUploadItem key={`${index}-${item instanceof File ? item.name : item.id}`} value={item} index={index} />
        ))}
      </FileUploadContent>
    </FileUpload>
  )
}
