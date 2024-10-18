// src/app/home/home.page.ts
import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule],
})
export class HomePage {
  key: string = '';
  value: string = '';
  output: string = '';

  constructor(private storage: Storage) {
    storage.create();
  }

  async setItem() {
    try {
      await this.storage.set(this.key, this.value);
      this.output = `Set ${this.key}: ${this.value}`;
    } catch (error) {
      console.error('Error setting item', error);
      this.output = `Error setting item: ${error}`;
    }
  }

  async getItem() {
    try {
      const value = await this.storage.get(this.key);
      this.output = `Get ${this.key}: ${value}`;
    } catch (error) {
      console.error('Error getting item', error);
      this.output = `Error getting item: ${error}`;
    }
  }

  async clear() {
    try {
      await this.storage.clear;
      this.output = `Cleared`;
    } catch (error) {
      console.error('Error clearing', error);
      this.output = `Error clearing: ${error}`;
    }
  }

  async remove() {
    try {
      await this.storage.remove(this.key);
      this.output = `Removed ${this.key}: ${this.value}`;
    } catch (error) {
      console.error('Error removing item', error);
      this.output = `Error removing item: ${error}`;
    }
  }

  async keys() {
    try {
      const keys = await this.storage.keys();
      this.output = `Keys: ${keys}`;
    } catch (error) {
      console.error('Error getting keys', error);
      this.output = `Error getting keys: ${error}`;
    }
  }

  async length() {
    try {
      const length = await this.storage.length();
      this.output = `Length: ${length}`;
    } catch (error) {
      console.error('Error getting length', error);
      this.output = `Error getting length: ${error}`;
    }
  }

  async forEach() {

    this.output = "";

    try {
      this.storage.forEach((key, value, index) => {
        this.output += key + ": " + value + ", ";
      });
    } catch (error) {
      console.error('Error getting items', error);
      this.output = `Error getting items: ${error}`;
    }
  }

}

function callback(value: any, key: string, iterationNumber: Number) {
  throw new Error('Function not implemented.');
}
