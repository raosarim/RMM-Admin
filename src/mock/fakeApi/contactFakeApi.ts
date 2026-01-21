import { mock } from '../MockAdapter'
import { ContactSupport } from '@/services/ContactService'

let contactSupportList: ContactSupport[] = [
    {
        id: '1',
        addressLine1: '2118 Thornridge Cir.',
        addressLine2: 'Suite 100',
        city: 'Syracuse',
        state: 'Connecticut',
        zipCode: '35624',
        country: 'United States',
        phoneNumber: '(171) 555-2111',
        emailAddress: 'rememberme@demo.com',
        facebookUrl: 'https://www.facebook.com/rememberme',
        instagramUrl: 'https://www.instagram.com/rememberme',
        twitterUrl: 'https://www.twitter.com/rememberme',
        linkedinUrl: 'https://www.linkedin.com/company/rememberme',
    },
]

mock.onGet(`/api/contact-support/list`).reply(() => {
    return [200, contactSupportList]
})

mock.onPost(`/api/contact-support/create`).reply((config) => {
    const data = JSON.parse(config.data || '{}')
    const newData: ContactSupport = {
        ...data,
        id: Math.random().toString(36).substr(2, 9),
    }
    contactSupportList.unshift(newData)
    return [200, newData]
})

mock.onPut(`/api/contact-support/update`).reply((config) => {
    const data = JSON.parse(config.data || '{}')
    contactSupportList = contactSupportList.map((item) =>
        item.id === data.id ? { ...item, ...data } : item,
    )
    return [200, data]
})

mock.onDelete(`/api/contact-support/delete`).reply((config) => {
    const id = config.params.id
    contactSupportList = contactSupportList.filter((item) => item.id !== id)
    return [200, true]
})
