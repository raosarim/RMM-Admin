import ApiService from './ApiService'

export type ContactSupport = {
    id: string
    addressLine1: string
    addressLine2: string
    city: string
    state: string
    zipCode: string
    country: string
    phoneNumber: string
    emailAddress: string
    facebookUrl: string
    instagramUrl: string
    twitterUrl: string
    linkedinUrl: string
}

export async function apiGetContactSupportList() {
    return ApiService.fetchDataWithAxios<ContactSupport[]>({
        url: '/contact-support/list',
        method: 'get',
    })
}

export async function apiCreateContactSupport(data: Omit<ContactSupport, 'id'>) {
    return ApiService.fetchDataWithAxios<ContactSupport>({
        url: '/contact-support/create',
        method: 'post',
        data,
    })
}

export async function apiUpdateContactSupport(data: Partial<ContactSupport>) {
    return ApiService.fetchDataWithAxios<ContactSupport>({
        url: '/contact-support/update',
        method: 'put',
        data,
    })
}

export async function apiDeleteContactSupport(id: string) {
    return ApiService.fetchDataWithAxios<boolean>({
        url: '/contact-support/delete',
        method: 'delete',
        params: { id },
    })
}
