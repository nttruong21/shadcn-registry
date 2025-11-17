import { FileUpload, FileUploadContent, FileUploadInput, FileUploadItem } from '@/components/molecules/file-upload'
import FieldContainer, { type FieldProps } from './field-container'

// Component
const FileField = ({ fieldData, disabledFields }: FieldProps) => {
  // Template
  return (
    <FieldContainer fieldData={fieldData} disabledFields={disabledFields}>
      {({ field, fieldState }) => (
        <FileUpload
          value={field.value ? [field.value] : []}
          dropzoneOptions={fieldData.config?.dropzoneOptions}
          isDisabled={disabledFields?.[fieldData.code]}
          onValueChange={(files) => field.onChange(files[0] ?? null)}
        >
          <FileUploadInput id={fieldData.code} aria-invalid={fieldState.invalid} />

          <FileUploadContent>{field.value && <FileUploadItem value={field.value} index={0} />}</FileUploadContent>
        </FileUpload>
      )}
    </FieldContainer>
  )
}

export default FileField
