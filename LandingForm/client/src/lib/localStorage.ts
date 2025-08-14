import type { Contact, InsertContact } from "@shared/schema";

const CONTACTS_KEY = 'connectpro_contacts';

export class LocalStorageService {
  static getContacts(): Contact[] {
    try {
      const stored = localStorage.getItem(CONTACTS_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  static saveContact(contact: InsertContact): Contact {
    const contacts = this.getContacts();
    const newContact: Contact = {
      id: crypto.randomUUID(),
      ...contact,
      createdAt: new Date()
    };
    
    contacts.push(newContact);
    localStorage.setItem(CONTACTS_KEY, JSON.stringify(contacts));
    return newContact;
  }

  static clearContacts(): void {
    localStorage.removeItem(CONTACTS_KEY);
  }
}