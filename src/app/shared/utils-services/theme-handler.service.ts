import { OverlayContainer } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeHandlerService {

  
  currentTheme: 'light-theme' | 'dark-theme' | null =  null

  constructor(private overlayContainer: OverlayContainer) {}

  getCurrentTheme(): 'light-theme' | 'dark-theme' | null {

    this.currentTheme = localStorage.getItem('current-theme') as ('light-theme' | 'dark-theme')
    return this.currentTheme ? this.currentTheme : null
  }
  
  setCurrentTheme(currentTheme: 'light-theme' | 'dark-theme'): void {
    this.currentTheme = currentTheme
    localStorage.setItem('current-theme' , currentTheme)
    const overlayContainerClasses = this.overlayContainer.getContainerElement().classList;
    const themeClassesToRemove = Array.from(overlayContainerClasses)
        .filter((item: string) => item.includes('theme'));
    if (themeClassesToRemove.length) {
        overlayContainerClasses.remove(...themeClassesToRemove);
    }
    overlayContainerClasses.add(currentTheme);
  }   


}
