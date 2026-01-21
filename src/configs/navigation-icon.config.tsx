import {
    PiHouseLineDuotone,
    PiArrowsInDuotone,
    PiBookOpenUserDuotone,
    PiBookBookmarkDuotone,
    PiAcornDuotone,
    PiBagSimpleDuotone,
} from 'react-icons/pi'
import type { JSX } from 'react'
import LandingModeSvg from '@/assets/svg/LandingModeSvg'
import TemplatesSvg from '@/assets/svg/TemplatesSvg'
import SubscriptionSvg from '@/assets/svg/SubscriptionSvg'

export type NavigationIcons = Record<string, JSX.Element>

const navigationIcon: NavigationIcons = {
    home: <PiHouseLineDuotone />,
    singleMenu: <PiAcornDuotone />,
    collapseMenu: <PiArrowsInDuotone />,
    groupSingleMenu: <PiBookOpenUserDuotone />,
    groupCollapseMenu: <PiBookBookmarkDuotone />,
    groupMenu: <PiBagSimpleDuotone />,
    landingMode: <LandingModeSvg />,
    templates: <TemplatesSvg />,
    subscription: <SubscriptionSvg />,
}

export default navigationIcon
