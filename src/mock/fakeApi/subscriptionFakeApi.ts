import { mock } from '../MockAdapter'
import { SubscriptionPackage } from '@/services/SubscriptionService'

let subscriptionPackages: SubscriptionPackage[] = [
    {
        id: '1',
        packageName: 'Eternal Archive',
        iconURL: 'https://cdn-icons-png.flaticon.com/512/3602/3602145.png',
        price: 25,
        priceUnit: 'month',
        storageAmount: 30,
        storageUnit: 'GB',
        features: [
            'Complete funeral arrangements',
            'Transportation and logistics',
            'Documentation assistance',
            'Traditional ceremony coordination'
        ],
        isActive: true,
    },
]

mock.onGet(`/api/subscription/list`).reply(() => {
    return [200, subscriptionPackages]
})

mock.onPost(`/api/subscription/create`).reply((config) => {
    const data = JSON.parse(config.data || '{}')
    const newData: SubscriptionPackage = {
        ...data,
        id: Math.random().toString(36).substr(2, 9),
    }
    subscriptionPackages.unshift(newData)
    return [200, newData]
})

mock.onPut(`/api/subscription/update`).reply((config) => {
    const data = JSON.parse(config.data || '{}')
    subscriptionPackages = subscriptionPackages.map((item) =>
        item.id === data.id ? { ...item, ...data } : item,
    )
    return [200, data]
})

mock.onDelete(`/api/subscription/delete`).reply((config) => {
    const id = config.params.id
    subscriptionPackages = subscriptionPackages.filter((item) => item.id !== id)
    return [200, true]
})
