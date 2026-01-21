import { mock } from '../MockAdapter'
import { PrivacyPolicy } from '@/services/PrivacyService'

let privacyPolicies: PrivacyPolicy[] = [
    {
        id: '1',
        title: 'Privacy Policy',
        type: 'privacy_policy',
        content: '<p>This is the privacy policy content.</p>',
        effectiveDate: new Date().toISOString(),
    },
    {
        id: '2',
        title: 'Terms of Service',
        type: 'terms_and_conditions',
        content: '<p>This is the terms of service content.</p>',
        effectiveDate: new Date().toISOString(),
    },
]

mock.onGet(`/api/privacy-policy/list`).reply(() => {
    return [200, privacyPolicies]
})

mock.onPost(`/api/privacy-policy/create`).reply((config) => {
    const data = JSON.parse(config.data || '{}')
    const newPolicy: PrivacyPolicy = {
        ...data,
        id: Math.random().toString(36).substr(2, 9),
        updatedAt: new Date().toISOString(),
    }
    privacyPolicies.unshift(newPolicy)
    return [200, newPolicy]
})

mock.onPut(`/api/privacy-policy/update`).reply((config) => {
    const data = JSON.parse(config.data || '{}')
    privacyPolicies = privacyPolicies.map((p) =>
        p.id === data.id ? { ...p, ...data, updatedAt: new Date().toISOString() } : p,
    )
    return [200, data]
})

mock.onDelete(`/api/privacy-policy/delete`).reply((config) => {
    const id = config.params.id
    privacyPolicies = privacyPolicies.filter((p) => p.id !== id)
    return [200, true]
})
