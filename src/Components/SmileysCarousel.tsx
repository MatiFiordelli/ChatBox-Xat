import React, { useEffect, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/mousewheel"
import { Navigation, Mousewheel } from "swiper/modules"
import { getSmileysMap } from "../Functions"
import { PropsSmileysCarousel } from "../Types"

export default function SmileysCarousel({ statusProps }: PropsSmileysCarousel) {
	const [smileysNormal, setSmileysNormal] = useState<Map<string, string> | null>(null)

	useEffect(() => {
		setSmileysNormal(getSmileysMap)
	}, [])

	const onClickSmiley = (src: string) => {
		statusProps.setSmiley({src: src, code: smileysNormal?.get(`${src}`) })
		statusProps.messageInputRef.current?.focus()
	}

	return (
		<Swiper
			slidesPerView={"auto"}
			centeredSlides={false}
			spaceBetween={0}
			grabCursor={true}
			pagination={{
				clickable: true,
			}}
			modules={[Navigation, Mousewheel]}
			mousewheel={true}
			speed={10}
			className="w-full h-[4.4rem] bg-slate-500"
		>
			{smileysNormal &&
				smileysNormal.size > 0 &&
				Array.from(smileysNormal.keys()).map(
					(src: string, i: React.Key) => (
						<SwiperSlide
							className="cursor-pointer flex justify-center items-center w-auto bg-transparent text-center text-lg pl-5"
							key={i}
						>
							<img
								className="block w-10 h-10 object-cover"
								src={src}
								onLoad={(e) => {
									if (e.currentTarget.complete)
										e.currentTarget.style.opacity = "100"
								}}
								alt={smileysNormal.get(`${src}`)}
								title={smileysNormal.get(`${src}`)}
								onClick={() => onClickSmiley(src)}
							/>
						</SwiperSlide>
					)
				)}
		</Swiper>
	)
}
