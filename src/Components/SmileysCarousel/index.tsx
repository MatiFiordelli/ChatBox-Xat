import React, { useContext, useEffect, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/mousewheel"
import { Navigation, Mousewheel } from "swiper/modules"
import { getSmileysMap } from "../../Functions/getSmileyMap"
import { useDispatch } from "react-redux"
import { addSmiley } from "../../Redux/actions"
import { MessageInputRefCtx } from "../../Context"

export default function SmileysCarousel() {
	const messageInputRef = useContext(MessageInputRefCtx)
	const [smileysData, setSmileysData] = useState<Map<string, string> | null>(null)
	const dispatch = useDispatch()

	useEffect(() => {
		setSmileysData(getSmileysMap)
	}, [])

	const onClickSmiley = (src: string) => {
		dispatch(addSmiley({src: src, code: smileysData?.get(`${src}`) }))
		messageInputRef?.current?.focus()
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
			className="w-full h-[12%] bg-slate-500"
		>
			{smileysData &&
				smileysData.size > 0 &&
				Array.from(smileysData.keys()).map(
					(src: string, i: React.Key) => (
						<SwiperSlide
							className="cursor-pointer flex justify-center items-center w-auto h-full bg-transparent text-center text-lg pl-5 2xl:pl-16 "
							key={i}
						>
							<img
								className="block w-auto sm:w-[4vw] h-auto object-cover aspect-auto"
								src={src}
								onLoad={(e) => {
									if (e.currentTarget.complete)
										e.currentTarget.style.opacity = "100"
								}}
								alt={smileysData.get(`${src}`)}
								title={smileysData.get(`${src}`)}
								onClick={() => onClickSmiley(src)}
							/>
						</SwiperSlide>
					)
				)}
		</Swiper>
	)
}
