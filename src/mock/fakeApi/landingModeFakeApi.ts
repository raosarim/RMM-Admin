import { mock } from '../MockAdapter'
import { LandingMode } from '@/services/LandingModeService'

let landingModes: LandingMode[] = [
    {
        id: '1',
        title: 'Full Mode',
        description: 'Includes all features: Video, Photo, Guestbook, and More.',
        landingModeType: 'full-mode',
        iconURL: 'https://storage.googleapis.com/rmm-media-staging/memorials/1768834153377-SVG__2_.png',
        isActive: true,
    },
    {
        id: '2',
        title: 'Video Only Mode',
        description: 'Best for funerals or memorial events. Where every visitor should see the same tribute video first',
        landingModeType: 'video-only-mode',
        iconURL: 'https://storage.googleapis.com/rmm-media-staging/memorials/1768834153377-SVG__2_.png',
        isActive: true,
    }
]

mock.onGet(/\/landing-mode\/list/).reply(() => {
    return [200, landingModes]
})

mock.onPost(/\/landing-mode\/create/).reply((config) => {
    const data = JSON.parse(config.data || '{}')
    const newItem: LandingMode = {
        ...data,
        id: Math.random().toString(36).substr(2, 9),
    }
    landingModes.push(newItem)
    return [200, newItem]
})

mock.onPut(/\/landing-mode\/update/).reply((config) => {
    const data = JSON.parse(config.data || '{}')
    landingModes = landingModes.map((item) =>
        item.id === data.id ? { ...item, ...data } : item,
    )
    return [200, data]
})

mock.onDelete(/\/landing-mode\/delete/).reply((config) => {
    const id = config.params.id
    landingModes = landingModes.filter((item) => item.id !== id)
    return [200, true]
})
