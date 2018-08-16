import storageService from './storage.service.js'
import axios from 'axios';

const KEY = 'contactsAppKey';


function query() {
    return axios.get('contactsDb.json')
        .then(res => {
            localStorage[KEY] = JSON.stringify(res.data)
            return res.data;
        });

}

function getEmptyObj() {
    return {
        id: '',
        firstName: '',
        lastName: '',
        birthDay: '',
        phoneNumber: '',
        emailAddress: '',
        photo: '',
        accountName: '',
        password: ''
    }

}

function removeContact(contactId) {
    return storageService.load(KEY).then(contacts => {
        contacts = contacts.filter(contact => contact.id !== contactId);
        return storageService.store(KEY, contacts);
    });
}

function saveContact(contact) {
    return new Promise((resolve, reject) => {
        storageService.load(KEY)
            .then(contacts => {
                contact.id = Date.now();
                contacts.unshift(contact);
                storageService.store(KEY, contacts);
                resolve(contact)
            });
    });

}

export default {
    saveContact,
    removeContact,
    getEmptyObj,
    query
}
