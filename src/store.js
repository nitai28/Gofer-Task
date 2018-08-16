import Vue from "vue";
import Vuex from "vuex";
import contactService from "./services/contact.service.js";

Vue.use(Vuex);

export default new Vuex.Store({
    strict: true,
    state: {
        contacts: [],
        currentContact: {},
    },
    mutations: {
        setContacts(state, {contacts}) {
            state.contacts = contacts;
        },
        setSelectedContact(state, {id}) {
            let contact = state.contacts.find(contact => contact.id === id)
            state.currentContact = contact;
        },
        deleteContact(state, {id}) {
            state.contacts = state.contacts.filter(contact => contact.id !== id);
        },
        addContact(state, {contact}) {
            state.contacts = [contact, ...state.contacts];
        },

        updateContact(state, {contact}) {
            const contactIdx = state.contacts.findIndex(
                currContact => currContact.id === contact.id
            );
            state.contacts.splice(contactIdx, 1, contact);
        },


    },

    actions: {

        getContacts(store) {
            contactService.query()
                .then(contacts => {
                    store.commit({type: 'setContacts', contacts})
                })
        },

        deletedContact(store, {id}) {
            contactService.removeContact(id).then(() => {
                store.commit({type: "deleteContact", id});
            });
        },
        saveContact(store, {contact}) {
            return contactService.saveContact(contact).then(contact => {
                store.commit({type: "addContact", contact});
                return contact;
            });
        },


    },
    getters: {
        contactsForDisplay(state) {
            return state.contacts;
        },

    }
});
