// src/app/home/home.page.ts
import { Component } from '@angular/core';
import { StorageService } from '../services/storage.service';
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

  constructor(private storageService: StorageService) {}

  async setItem() {
    try {
      await this.storageService.set(this.key, this.value);
      this.output = `Set ${this.key}: ${this.value}`;
    } catch (error) {
      console.error('Error setting item', error);
      this.output = `Error setting item: ${error}`;
      throw error;
    }
  }

  async getItem() {
    try {
      const value = await this.storageService.get(this.key);

      if(await this.storageService.exists(this.key) == false)
      {
        throw new Error(this.key + " does not exist");
      }

      this.output = `Get ${this.key}: ${value}`;
    } catch (error) {
      console.error('Error getting item', error);
      this.output = `Error getting item: ${error}`;
      throw error;
    }
  }

  async clear() {
    try {
      await this.storageService.clear();
      this.output = `Cleared`;
    } catch (error) {
      console.error('Error clearing', error);
      this.output = `Error clearing: ${error}`;
      throw error;
    }
  }

  async remove() {
    try {
      await this.storageService.remove(this.key);

      if(await this.storageService.exists(this.key) == false)
      {
        throw new Error(this.key + " does not exist");
      }

      this.output = `Removed ${this.key}: ${this.value}`;
    } catch (error) {
      console.error('Error removing item', error);
      this.output = `Error removing item: ${error}`;
      
    }
  }

  async keys() {
    try {
      const keys = await this.storageService.keys();
      this.output = `Keys: ${keys}`;
    } catch (error) {
      console.error('Error getting keys', error);
      this.output = `Error getting keys: ${error}`;
      throw error;
    }
  }

  async length() {
    try {
      const length = await this.storageService.length();
      this.output = `Length: ${length}`;
    } catch (error) {
      console.error('Error getting length', error);
      this.output = `Error getting length: ${error}`;
      throw error;
    }
  }

  async forEach() {

    this.output = "";

    try {
      this.storageService.forEach((key, value, index) => {
        this.output += key + ": " + value + ", ";
      });
    } catch (error) {
      console.error('Error getting items', error);
      this.output = `Error getting items: ${error}`;
      throw error;
    }
  }

  async exists() {
    try {
      const exists = await this.storageService.exists(this.key);
      this.output = `Exists: ${exists}`;
    } catch (error) {
      console.error('Error checking if exists', error);
      this.output = `Error checking if exists: ${error}`;
      throw error;
    }
  }

}

