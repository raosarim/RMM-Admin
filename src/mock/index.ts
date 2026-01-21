import { mock } from './MockAdapter'
import './fakeApi/authFakeApi'
import './fakeApi/commonFakeApi'
import './fakeApi/privacyFakeApi'
import './fakeApi/contactFakeApi'
import './fakeApi/faqFakeApi'
import './fakeApi/subscriptionFakeApi'
import './fakeApi/landingModeFakeApi'
import './fakeApi/templateFakeApi'

mock.onAny().passThrough()
