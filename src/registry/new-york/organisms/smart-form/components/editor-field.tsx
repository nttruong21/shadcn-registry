import { Editor } from '@/components/organisms/editor'
import FieldContainer, { type FieldProps } from './field-container'

// Component
const EditorField = ({ fieldData, disabledFields }: FieldProps) => {
  // Template
  return (
    <FieldContainer fieldData={fieldData} disabledFields={disabledFields}>
      {({ field }) => (
        <Editor value={field.value} editable={!disabledFields?.[fieldData.code]} onValueChange={field.onChange} />
      )}
    </FieldContainer>
  )
}

export default EditorField
