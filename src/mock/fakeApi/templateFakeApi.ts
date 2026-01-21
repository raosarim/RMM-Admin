import { mock } from '../MockAdapter'
import { Template } from '@/services/TemplateService'

let templates: Template[] = [
    {
        id: '1',
        name: 'Eternal Peace',
        landingModeId: '1',
        thumbnailURL: 'https://res.cloudinary.com/dwlj6ssuw/image/upload/v1768488434/yej6jpbtonm3wjprxy8u.png',
    },
    {
        id: '2',
        name: 'Event Mode',
        landingModeId: '2',
        thumbnailURL: 'https://res.cloudinary.com/dwlj6ssuw/image/upload/v1768488434/yej6jpbtonm3wjprxy8u.png',
    }
]

mock.onGet(/\/template\/list/).reply(() => {
    return [200, templates]
})

mock.onPost(/\/template\/create/).reply((config) => {
    const data = JSON.parse(config.data || '{}')
    const newItem: Template = {
        ...data,
        id: Math.random().toString(36).substr(2, 9),
    }
    templates.push(newItem)
    return [200, newItem]
})

mock.onPut(/\/template\/update/).reply((config) => {
    const data = JSON.parse(config.data || '{}')
    templates = templates.map((item) =>
        item.id === data.id ? { ...item, ...data } : item,
    )
    return [200, data]
})

mock.onDelete(/\/template\/delete/).reply((config) => {
    const id = config.params.id
    templates = templates.filter((item) => item.id !== id)
    return [200, true]
})
