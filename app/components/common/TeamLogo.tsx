import Image from 'next/image'

type Props = {
  src: string
  alt: string
  size?: number
}

export default function TeamLogo({ src, alt, size = 44 }: Props) {
  return (
    <div
      className="flex items-center justify-center flex-shrink-0"
      style={{ width: size, height: size }}
    >
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        className="object-contain w-full h-full"
      />
    </div>
  )
}
