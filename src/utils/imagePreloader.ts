// Image preloader utility for background images
export class ImagePreloader {
  private static instance: ImagePreloader;
  private preloadedImages: Map<string, string> = new Map();
  private loadingPromises: Map<string, Promise<string>> = new Map();

  private constructor() {}

  static getInstance(): ImagePreloader {
    if (!ImagePreloader.instance) {
      ImagePreloader.instance = new ImagePreloader();
    }
    return ImagePreloader.instance;
  }

  // Convert image to base64 and store in localStorage
  private async imageToBase64(imagePath: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          if (!ctx) {
            reject(new Error('Could not get canvas context'));
            return;
          }

          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
          
          const base64 = canvas.toDataURL('image/png', 0.8);
          resolve(base64);
        } catch (error) {
          reject(error);
        }
      };
      
      img.onerror = () => reject(new Error(`Failed to load image: ${imagePath}`));
      img.src = imagePath;
    });
  }

  // Get cached image from localStorage
  private getCachedImage(key: string): string | null {
    try {
      return localStorage.getItem(`bg_image_${key}`);
    } catch (error) {
      console.warn('Failed to access localStorage:', error);
      return null;
    }
  }

  // Store image in localStorage
  private setCachedImage(key: string, base64Data: string): void {
    try {
      localStorage.setItem(`bg_image_${key}`, base64Data);
    } catch (error) {
      console.warn('Failed to store image in localStorage:', error);
      // If localStorage is full, try to clear old cached images
      this.clearOldCache();
    }
  }

  // Clear old cached images to free up space
  private clearOldCache(): void {
    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith('bg_image_') && !this.isCurrentImage(key)) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.warn('Failed to clear cache:', error);
    }
  }

  // Check if this is one of our current images
  private isCurrentImage(key: string): boolean {
    const currentImages = ['events_bg', 'squid_game_bg'];
    return currentImages.some(img => key.includes(img));
  }

  // Preload and cache a single image
  async preloadImage(imagePath: string, cacheKey: string): Promise<string> {
    // Check if already preloaded in memory
    if (this.preloadedImages.has(cacheKey)) {
      return this.preloadedImages.get(cacheKey)!;
    }

    // Check if already loading
    if (this.loadingPromises.has(cacheKey)) {
      return this.loadingPromises.get(cacheKey)!;
    }

    // Check localStorage cache first
    const cached = this.getCachedImage(cacheKey);
    if (cached) {
      this.preloadedImages.set(cacheKey, cached);
      return cached;
    }

    // Load and cache the image
    const loadPromise = this.imageToBase64(imagePath)
      .then(base64 => {
        this.preloadedImages.set(cacheKey, base64);
        this.setCachedImage(cacheKey, base64);
        this.loadingPromises.delete(cacheKey);
        return base64;
      })
      .catch(error => {
        console.error(`Failed to preload image ${imagePath}:`, error);
        this.loadingPromises.delete(cacheKey);
        // Return original path as fallback
        return imagePath;
      });

    this.loadingPromises.set(cacheKey, loadPromise);
    return loadPromise;
  }

  // Preload all background images
  async preloadBackgroundImages(): Promise<void> {
    const imagesToPreload = [
      { path: '/assets/images/events_bg.png', key: 'events_bg' },
      { path: '/assets/images/squid_game_bg.png', key: 'squid_game_bg' }
    ];

    const preloadPromises = imagesToPreload.map(({ path, key }) => 
      this.preloadImage(path, key).catch(error => {
        console.warn(`Failed to preload ${path}:`, error);
      })
    );

    await Promise.allSettled(preloadPromises);
    console.log('Background images preloading completed');
  }

  // Get preloaded image (returns base64 if cached, original path if not)
  getPreloadedImage(cacheKey: string, fallbackPath: string): string {
    const cached = this.preloadedImages.get(cacheKey) || this.getCachedImage(cacheKey);
    return cached || fallbackPath;
  }

  // Check if image is ready
  isImageReady(cacheKey: string): boolean {
    return this.preloadedImages.has(cacheKey) || !!this.getCachedImage(cacheKey);
  }
}

// Export singleton instance
export const imagePreloader = ImagePreloader.getInstance();