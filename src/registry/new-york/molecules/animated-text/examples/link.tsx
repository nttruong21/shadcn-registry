import { AnimatedText } from '@/components/molecules/animated-text'

// Component
const AnimatedTextLink = () => {
  // Template
  return (
    <div className='w-full'>
      <AnimatedText
        text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
        linkWords={['Lorem', 'Ipsum']}
        linkUrls={['/', '/']}
      />
    </div>
  )
}

export default AnimatedTextLink
