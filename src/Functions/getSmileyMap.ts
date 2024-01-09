export const getSmileysMap = () => {
    const smileysSrcsStrings =
            "a_(confused)_20.webp a_(confused)_30.webp a_(cool)_20.webp a_(cool)_30.webp a_(cry2)_20.webp a_(cry2)_30.webp a_(crying)_20.webp a_(crying)_30.webp a_(d)_20.webp a_(d)_30.webp a_(eek)_20.webp a_(eek)_30.webp a_(frown)_20.webp a_(frown)_30.webp a_(goo)_20.webp a_(goo)_30.webp a_(hello)_20.webp a_(hello)_30.webp a_(hmm)_20.webp a_(hmm)_30.webp a_(kiss)_20.webp a_(kiss)_30.webp a_(l)_20.webp a_(l)_30.png a_(mad)_20.webp a_(mad)_30.webp a_(meh)_20.webp a_(meh)_30.webp a_(n)_20.webp a_(n)_30.webp a_(no)_20.webp a_(no)_30.webp a_(nod)_20.webp a_(nod)_30.webp a_(omg)_20.webp a_(omg)_30.webp a_(ooo)_20.webp a_(ooo)_30.webp a_(puke)_20.webp a_(puke)_30.webp a_(redface)_20.webp a_(redface)_30.webp a_(roll)_20.webp a_(roll)_30.webp a_(sad)_20.webp a_(sad)_30.webp a_(scn)_20.webp a_(scn)_30.webp a_(sleepy)_20.webp a_(sleepy)_30.webp a_(smile)_20.webp a_(smile)_30.webp a_(think)_20.webp a_(think)_30.webp a_(toj)_20.webp a_(toj)_30.webp a_(tongue)_20.webp a_(tongue)_30.webp a_(ttm)_30.webp a_(ttm)_20.webp a_(u)_20.webp a_(u)_30.webp a_(un)_20.webp a_(un)_30.webp a_(wary)_20.webp a_(wary)_30.webp a_(wink)_20.webp a_(wink)_30.webp a_(wt)_20.webp a_(wt)_30.webp a_(xd)_20.webp a_(xd)_30.webp a_(y)_20.webp a_(y)_30.png a_(biggrin)_20.webp a_(biggrin)_30.webp a_(cd)_30.webp a_(cd)_20.webp"
    const smileySrcs = smileysSrcsStrings.split(' ')
    let smileysNormalMap = new Map()
    let smileysTinyMap = new Map()
    smileySrcs.filter((e, i)=>{
        return (i%2===0)
            ? smileysTinyMap.set(
                                    e,
                                    e
                                    .match(/ *\([^)]*\) */g)
                                    ?.toString()
                                    .toUpperCase())
            : smileysNormalMap.set(
                                    e,
                                    e
                                    .match(/ *\([^)]*\) */g)
                                    ?.toString()
                                    .toUpperCase())
    })

    return smileysNormalMap
}