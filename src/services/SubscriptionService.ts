import ApiService from './ApiService'

export type SubscriptionPackage = {
    id: string
    packageName: string
    iconURL: string
    price: number
    priceUnit: string
    storageAmount: number
    storageUnit: string
    features: string[]
    isActive: boolean
}

export async function apiGetSubscriptionPackages() {
    return ApiService.fetchDataWithAxios<SubscriptionPackage[]>({
        url: '/subscription/list',
        method: 'get',
    })
}

export async function apiCreateSubscriptionPackage(data: Omit<SubscriptionPackage, 'id'>) {
    return ApiService.fetchDataWithAxios<SubscriptionPackage>({
        url: '/subscription/create',
        method: 'post',
        data,
    })
}

export async function apiUpdateSubscriptionPackage(data: Partial<SubscriptionPackage>) {
    return ApiService.fetchDataWithAxios<SubscriptionPackage>({
        url: '/subscription/update',
        method: 'put',
        data,
    })
}

export async function apiDeleteSubscriptionPackage(id: string) {
    return ApiService.fetchDataWithAxios<boolean>({
        url: '/subscription/delete',
        method: 'delete',
        params: { id },
    })
}
