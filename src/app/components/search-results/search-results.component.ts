import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServerService } from 'src/app/services/server/server.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css'],
})
export class SearchResultsComponent {
  query: string = '';
  results = [];
  // results = [
  //   {
  //     id: 'bzW9fmwcmG4',
  //     title:
  //       'Daru Badnaam | Kamal Kahlon & Param Singh | Official Video | Pratik Studio | Latest Punjabi Songs',
  //     thumbnail: 'https://i.ytimg.com/vi/bzW9fmwcmG4/hq720.jpg',
  //     duration: '4:01',
  //   },
  //   {
  //     id: 'Pmva62F9dRY',
  //     title:
  //       'DARU BADNAAM | One Take | Tejas Dhoke Choreography | DanceFit Live',
  //     thumbnail: 'https://i.ytimg.com/vi/Pmva62F9dRY/hq720.jpg',
  //     duration: '5:09',
  //   },
  //   {
  //     id: 'F00pPs2WOIM',
  //     title: 'Daru Badnaam (Lyrics) - Kamal Kahlon & Param Singh',
  //     thumbnail: 'https://i.ytimg.com/vi/F00pPs2WOIM/hq720.jpg',
  //     duration: '3:06',
  //   },
  //   {
  //     id: 'hzTg4zPBtDU',
  //     title:
  //       '"3 Peg Sharry Mann" (Full Video) | Mista Baaz | Parmish Verma | Ravi Raj | Latest Punjabi Songs 2016',
  //     thumbnail: 'https://i.ytimg.com/vi/hzTg4zPBtDU/hq720.jpg',
  //     duration: '4:40',
  //   },
  //   {
  //     id: 'rS6kbBjXXjA',
  //     title:
  //       'Daru Badnaam - Kamal Kahlon & Param Singh | Sandeep Chhabra | Souls On Fire 2',
  //     thumbnail: 'https://i.ytimg.com/vi/rS6kbBjXXjA/hq720.jpg',
  //     duration: '2:25',
  //   },
  //   {
  //     id: 'I1nFKf5xOFs',
  //     title:
  //       'Daru Badnaam  Himanshi Khurana  New Punjabi Songs 2018  Latest Punjabi Viral Song 2018',
  //     thumbnail: 'https://i.ytimg.com/vi/I1nFKf5xOFs/hq720.jpg',
  //     duration: '3:02',
  //   },
  //   {
  //     id: 'iA13-z63rE4',
  //     title: '𝑫𝒂𝒓𝒖 𝒃𝒂𝒅𝒏𝒂𝒎 🥃✨(𝒔𝒍𝒐𝒘𝒆𝒅 & 𝒓𝒆𝒗𝒂𝒆𝒗)',
  //     thumbnail: 'https://i.ytimg.com/vi/iA13-z63rE4/hqdefault.jpg',
  //     duration: '4:19',
  //   },
  //   {
  //     id: 'b9pSfZgp69U',
  //     title: 'Daru Badnam { 8D + Reverb } | Music Girl',
  //     thumbnail: 'https://i.ytimg.com/vi/b9pSfZgp69U/hq720.jpg',
  //     duration: '3:21',
  //   },
  //   {
  //     id: 'wrq7NSFBeBE',
  //     title: 'Daru badnaam karti song',
  //     thumbnail: 'https://i.ytimg.com/vi/wrq7NSFBeBE/hq720.jpg',
  //     duration: '3:06',
  //   },
  //   {
  //     id: 'lAWZL8Ka3O8',
  //     title: 'DARU BADNAAM  ( slowed + reverb  )',
  //     thumbnail: 'https://i.ytimg.com/vi/lAWZL8Ka3O8/hqdefault.jpg',
  //     duration: '3:27',
  //   },
  //   {
  //     id: 'BLDvvVbRbx0',
  //     title:
  //       'Daru Badnaam [Slowed + Reverb] - Kamal Kahlon & Param Singh | Punjabi Lofi Songs | Chillwithbeats',
  //     thumbnail: 'https://i.ytimg.com/vi/BLDvvVbRbx0/hq720.jpg',
  //     duration: '4:02',
  //   },
  //   {
  //     id: 'ePqiqqe5UwE',
  //     title:
  //       'Daru Badnaam | Kamal Kahlon & Param Singh | Ankit Sati Choreography',
  //     thumbnail: 'https://i.ytimg.com/vi/ePqiqqe5UwE/hq720.jpg',
  //     duration: '1:12',
  //   },
  //   {
  //     id: 'aUMUOS5wMuI',
  //     title:
  //       'Daru Badnaam -Kamal Kahlon %26 Param- Official Animated Video -Pratik Studio-Latest Punjabi',
  //     thumbnail: 'https://i.ytimg.com/vi/aUMUOS5wMuI/hqdefault.jpg',
  //     duration: '3:02',
  //   },
  //   {
  //     id: 'mcQSBByOf6I',
  //     title:
  //       'Daru  Badnaam | Bossbaby Version | Kamal Kahlon & Param Singh | Pratik Studio | Latest Punjabi Songs',
  //     thumbnail: 'https://i.ytimg.com/vi/mcQSBByOf6I/hq720.jpg',
  //     duration: '3:42',
  //   },
  //   {
  //     id: 'D127-L3Att4',
  //     title: 'Daru Badnaam | Punjabi Dance | Dance Cover | Seema Rathore',
  //     thumbnail: 'https://i.ytimg.com/vi/D127-L3Att4/hq720.jpg',
  //     duration: '3:04',
  //   },
  //   {
  //     id: 'vQg_cDJveIY',
  //     title:
  //       'Daru Badnaam // slowed & reverb// #black #trending #attitude #songs #kingstrike #slowedandreverb',
  //     thumbnail: 'https://i.ytimg.com/vi/vQg_cDJveIY/hq720.jpg',
  //     duration: '3:20',
  //   },
  //   {
  //     id: 'OLFv1dD9Tcg',
  //     title:
  //       'DARU BADNAM LOFI MIX || SLOW + REVERB || ROMANTIC LOFI || PUNJABI LOFI',
  //     thumbnail: 'https://i.ytimg.com/vi/OLFv1dD9Tcg/hqdefault.jpg',
  //     duration: '3:27',
  //   },
  //   {
  //     id: 'HIbgUPvzJhM',
  //     title: 'DARU BADNAAM  REMIX SONG',
  //     thumbnail: 'https://i.ytimg.com/vi/HIbgUPvzJhM/hq720.jpg',
  //     duration: '3:05',
  //   },
  //   {
  //     id: 'BoaoB784t8s',
  //     title: 'Daru Badnaam [slowed+reverb] | Elysian 🌸',
  //     thumbnail: 'https://i.ytimg.com/vi/BoaoB784t8s/hqdefault.jpg',
  //     duration: '3:44',
  //   },
  // ];
  isLoading = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private server: ServerService
  ) {
    this.query = this.route.snapshot.queryParams['query'];
    if (this.query === undefined || this.query.length < 1) {
      this.router.navigate(['/']);
    }
    this.route.queryParams.subscribe((s) => {
      this.isLoading = true;
      this.query = s['query'];
      if (this.query !== undefined) {
        this.server
          .getSearchResults(s['query'])
          .subscribe((responseText: any) => {
            this.results = responseText['results'];
            this.isLoading = false;
          });
      } else {
        this.server.getHome().subscribe((responseText: any) => {
          this.results = responseText['results'];
          this.isLoading = false;
        });
      }
    });
  }
}
