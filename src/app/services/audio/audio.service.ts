import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ServerService } from '../server/server.service';

interface AudioState {
  src: string;
  duration: number;
  currentPlaytime: number;
  isPaused: boolean;
  title: string;
  id: string;
  isLoading: boolean;
  thumbnail: string;
}

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  private audio = new Audio();
  private title: string = '';
  private id: string = '';
  private thumbnail: string = '';
  private isLoading: boolean = false;
  private subject = new BehaviorSubject<AudioState>({
    src: this.audio.src,
    duration: this.audio.duration,
    currentPlaytime: this.audio.currentTime,
    isPaused: this.audio.paused,
    title: 'No song playing',
    id: '',
    isLoading: false,
    thumbnail:
      'https://i.pinimg.com/474x/20/de/e0/20dee0e3d4026e878cf1c62f4bbba93f.jpg',
  });

  constructor(private server: ServerService) {
    this.audio.addEventListener('loadedmetadata', () => {
      this.updateState();
    });

    this.audio.addEventListener('play', () => {
      this.updateState();
    });

    this.audio.addEventListener('pause', () => {
      this.updateState();
    });

    this.audio.addEventListener('timeupdate', () => {
      this.updateState();
    });
  }

  private updateState() {
    this.subject.next({
      src: this.audio.src,
      duration: this.audio.duration,
      currentPlaytime: this.audio.currentTime,
      isPaused: this.audio.paused,
      title: this.title,
      id: this.id,
      isLoading: this.isLoading,
      thumbnail: this.thumbnail,
    });
  }

  getState(): Observable<AudioState> {
    return this.subject.asObservable();
  }

  play(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.audio.play().then(() => {
          this.updateState();
          resolve(); // Resolve the promise on successful playback
        });
      } catch (error) {
        console.error('Audio playback error:', error);
        reject(error); // Reject the promise with the error
      }
    });
  }

  pause(): void {
    try {
      this.audio.pause();
      this.updateState(); // Update state even if pause is synchronous
    } catch (error) {
      console.error('Audio pause error:', error);
      // Handle pause error (e.g., display error message)
    }
  }

  change(data: any): void {
    try {
      // Logic to fetch audio source based on id (replace with your implementation)
      let newSource = '';
      this.isLoading = true;
      this.updateState();
      this.server.getPlaybackURL(data['id']).subscribe((response: any) => {
        newSource = response['url'];
        this.audio.src = newSource;
        this.audio.load(); // Load the new audio source synchronously
        this.play();
        this.title = data['title'];
        this.thumbnail = data['thumbnail'];
        this.id = data['id'];
        this.isLoading = false;
        this.updateState();
      }); // Replace with actual source fetching logic
    } catch (error) {
      this.isLoading = false;
      console.error('Audio source change error:', error);
      // Handle source change error (e.g., notify subscribers, display error message)
    }
  }

  seek(time: number): void {
    try {
      if (time >= 0 && time <= this.audio.duration) {
        this.audio.currentTime = time;
        this.updateState();
      } else {
        console.warn('Invalid seek time. Must be within audio duration.');
      }
    } catch (error) {
      console.error('Audio seek error:', error);
      // Handle seek error (e.g., notify subscribers, display error message)
    }
  }
}
