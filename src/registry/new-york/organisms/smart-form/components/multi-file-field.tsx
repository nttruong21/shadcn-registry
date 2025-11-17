import {
  FileUpload,
  FileUploadContent,
  FileUploadInput,
  FileUploadItem,
  type FileUploadValue
} from '@/components/molecules/file-upload'
import FieldContainer, { type FieldProps } from './field-container'

// Component
const MultiFileField = ({ fieldData, disabledFields }: FieldProps) => {
  // Template
  return (
    <FieldContainer fieldData={fieldData} disabledFields={disabledFields}>
      {({ field, fieldState }) => (
        <FileUpload
          value={field.value}
          dropzoneOptions={fieldData.config?.dropzoneOptions}
          isDisabled={disabledFields?.[fieldData.code]}
          onValueChange={field.onChange}
        >
          <FileUploadInput id={fieldData.code} aria-invalid={fieldState.invalid} />

          <FileUploadContent>
            {(field.value as FileUploadValue).map((value, index) => (
              <FileUploadItem
                // biome-ignore lint/suspicious/noArrayIndexKey: ignore
                key={index}
                index={index}
                value={value}
              />
            ))}
          </FileUploadContent>
        </FileUpload>
      )}
    </FieldContainer>
  )
}

export default MultiFileField
