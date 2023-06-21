import ProgressiveImageEl from 'react-progressive-graceful-image'

type ImageProps = {
  src: string
  alt: string
  width?: string | number
  height?: string | number
  className?: string
}

const Placeholder = <div className="aspect-square bg-[#ebebeb]" />

export default function ProgressiveImage(props: ImageProps) {
  return (
    <ProgressiveImageEl src={props.src} placeholder={Placeholder}>
      {(_, isLoading) =>
        isLoading ? (
          Placeholder
        ) : (
          <img
            width={props.width || '100%'}
            height={props.width || '100%'}
            className={props.className || 'aspect-square object-cover'}
            {...props}
          />
        )
      }
    </ProgressiveImageEl>
  )
}
