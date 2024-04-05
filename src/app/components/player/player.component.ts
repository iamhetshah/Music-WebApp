import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { AudioService } from 'src/app/services/audio/audio.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
})
export class PlayerComponent implements AfterViewInit {
  @ViewChild('seeking') seekBar!: ElementRef;
  title: string = '';
  thumbnail: string = '';
  playing: boolean = false;
  isLoading: boolean = false;
  constructor(public audio: AudioService) {}

  ngAfterViewInit(): void {
    this.audio.getState().subscribe((state) => {
      this.seekBar.nativeElement.max = state.duration;
      this.seekBar.nativeElement.value = state.currentPlaytime;
      this.title = state.title;
      this.playing = !state.isPaused;
      this.isLoading = state.isLoading;
      this.thumbnail = state.thumbnail;
    });
  }

  play() {
    this.audio.play();
  }

  pause() {
    this.audio.pause();
  }

  seek() {
    this.audio.seek(this.seekBar.nativeElement.value);
  }
}
