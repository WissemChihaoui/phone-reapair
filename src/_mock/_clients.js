import { _mock } from "./_mock";
import { _clientTypes } from "./assets";

export const _clientList = [...Array(20)].map((_, index) => ({ 
    id: _mock.id(index),
    type: _mock.boolean(index) ? 'Particulier' : 'Entreprise',
    name: _mock.fullName(index),
    email: _mock.email(index),
    phoneNumber: _mock.phoneNumber(index),
    state: 'Sousse',
    address: '908 Jack Locks',
    zipCode: '85807',
    raison: _mock.boolean(index) ? '' : _mock.companyNames(index),
    siret:  _mock.boolean(index) ? '' :`FR-18854777${index}`,
    tva:  _mock.boolean(index) ? '' :`8557220${index}`,
    isTvaUnion:  _mock.boolean(index) ? '' :true,
    indvType: _mock.boolean(index) ? 'Client de passage' : ''
}))