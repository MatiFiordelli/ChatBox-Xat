import React, { useEffect, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/mousewheel"
import { Navigation, Mousewheel } from "swiper/modules"

interface PropsTypes {
	statusProps:{
		smiley:string|null,
		setSmiley:React.Dispatch<React.SetStateAction<string|null>>,
		messageInputRef: React.MutableRefObject<HTMLInputElement | null>
	}
}

export default function SmileysCarousel({statusProps}: PropsTypes) {
	const [smileysNormal, setSmileysNormal] = useState<string[]>([])

	useEffect(()=>{
		const smileysSrcsStrings =
		"src/assets/smileys/a_(confused)_20.webp src/assets/smileys/a_(confused)_30.webp src/assets/smileys/a_(cool)_20.webp src/assets/smileys/a_(cool)_30.webp src/assets/smileys/a_(cry2)_20.webp src/assets/smileys/a_(cry2)_30.webp src/assets/smileys/a_(crying)_20.webp src/assets/smileys/a_(crying)_30.webp src/assets/smileys/a_(d)_20.webp src/assets/smileys/a_(d)_30.webp src/assets/smileys/a_(eek)_20.webp src/assets/smileys/a_(eek)_30.webp src/assets/smileys/a_(frown)_20.webp src/assets/smileys/a_(frown)_30.webp src/assets/smileys/a_(goo)_20.webp src/assets/smileys/a_(goo)_30.webp src/assets/smileys/a_(hello)_20.webp src/assets/smileys/a_(hello)_30.webp src/assets/smileys/a_(hmm)_20.webp src/assets/smileys/a_(hmm)_30.webp src/assets/smileys/a_(kiss)_20.webp src/assets/smileys/a_(kiss)_30.webp src/assets/smileys/a_(l)_20.webp src/assets/smileys/a_(l)_30.png src/assets/smileys/a_(mad)_20.webp src/assets/smileys/a_(mad)_30.webp src/assets/smileys/a_(meh)_20.webp src/assets/smileys/a_(meh)_30.webp src/assets/smileys/a_(n)_20.webp src/assets/smileys/a_(n)_30.webp src/assets/smileys/a_(no)_20.webp src/assets/smileys/a_(no)_30.webp src/assets/smileys/a_(nod)_20.webp src/assets/smileys/a_(nod)_30.webp src/assets/smileys/a_(omg)_20.webp src/assets/smileys/a_(omg)_30.webp src/assets/smileys/a_(ooo)_20.webp src/assets/smileys/a_(ooo)_30.webp src/assets/smileys/a_(puke)_20.webp src/assets/smileys/a_(puke)_30.webp src/assets/smileys/a_(redface)_20.webp src/assets/smileys/a_(redface)_30.webp src/assets/smileys/a_(roll)_20.webp src/assets/smileys/a_(roll)_30.webp src/assets/smileys/a_(sad)_20.webp src/assets/smileys/a_(sad)_30.webp src/assets/smileys/a_(scn)_20.webp src/assets/smileys/a_(scn)_30.webp src/assets/smileys/a_(sleepy)_20.webp src/assets/smileys/a_(sleepy)_30.webp src/assets/smileys/a_(smile)_20.webp src/assets/smileys/a_(smile)_30.webp src/assets/smileys/a_(think)_20.webp src/assets/smileys/a_(think)_30.webp src/assets/smileys/a_(toj)_20.webp src/assets/smileys/a_(toj)_30.webp src/assets/smileys/a_(tongue)_20.webp src/assets/smileys/a_(tongue)_30.webp src/assets/smileys/a_(ttm)_30.webp src/assets/smileys/a_(ttm)_20.webp src/assets/smileys/a_(u)_20.webp src/assets/smileys/a_(u)_30.webp src/assets/smileys/a_(un)_20.webp src/assets/smileys/a_(un)_30.webp src/assets/smileys/a_(wary)_20.webp src/assets/smileys/a_(wary)_30.webp src/assets/smileys/a_(wink)_20.webp src/assets/smileys/a_(wink)_30.webp src/assets/smileys/a_(wt)_20.webp src/assets/smileys/a_(wt)_30.webp src/assets/smileys/a_(xd)_20.webp src/assets/smileys/a_(xd)_30.webp src/assets/smileys/a_(y)_20.webp src/assets/smileys/a_(y)_30.png src/assets/smileys/a_(biggrin)_20.webp src/assets/smileys/a_(biggrin)_30.webp src/assets/smileys/a_(cd)_30.webp src/assets/smileys/a_(cd)_20.webp"
		const smileySrcs = smileysSrcsStrings.split(' ')
		//let smileysNormalArray: string[] = []
		let smileysNormalArray: string[] = []
		let smileysTinyArray: string[] = [];
		smileySrcs.filter((e, i)=>{
			console.log(e.match(/ *\([^)]*\) */g))
			return (i%2===0)
				? smileysTinyArray.push(e)
				: smileysNormalArray.push(e)
		})
		setSmileysNormal(smileysNormalArray)
	
	},[])

	const onClickSmiley = (src:string) => {
		statusProps.setSmiley(`<img 
			src="${src}" 
			style="display:inline"
			alt="${src.match(/\((.*?)\)/g)?.toString()}"
			title="${src.match(/\((.*?)\)/g)?.toString().toUpperCase()}"
			/>`) 

		statusProps.messageInputRef.current && statusProps.messageInputRef.current.focus()
	}

	return (
		<>
			<Swiper
				slidesPerView={'auto'}
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
				{smileysNormal.length > 0 && smileysNormal.map((src:string, i: React.Key) => (
					<SwiperSlide 
						className="cursor-pointer flex justify-center items-center w-auto bg-transparent text-center text-lg pl-5"
						key= {i}
					>
						<img
							className="block w-10 h-10 object-cover"
							src={src}
							onLoad={(e)=>{
								if(e.currentTarget.complete) e.currentTarget.style.opacity = '100'
							}}
							alt={src.match(/\((.*?)\)/g)?.toString()}
							title={src.match(/\((.*?)\)/g)?.toString().toUpperCase()}
							onClick={()=>onClickSmiley(src)}
						/>
					</SwiperSlide>
				))}				
			</Swiper>
		</>
	)
}
