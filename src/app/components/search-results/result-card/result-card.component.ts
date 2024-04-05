import { Component, Input } from '@angular/core';
import { AudioService } from 'src/app/services/audio/audio.service';
import { ServerService } from 'src/app/services/server/server.service';

@Component({
  selector: 'app-result-card',
  templateUrl: './result-card.component.html',
  styleUrls: ['./result-card.component.css'],
})
export class ResultCardComponent {
  @Input({ required: true }) details!: {
    duration: string;
    id: string;
    thumbnail: string;
    title: string;
  };
  constructor(public server: ServerService, public audio: AudioService) {}
}
