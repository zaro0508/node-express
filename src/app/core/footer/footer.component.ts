import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'footer',
  templateUrl: './footer.component.html',
  styleUrls: [ './footer.component.scss' ],
  encapsulation: ViewEncapsulation.None
})
export class FooterComponent {
    constructor(
        private router: Router
    ) {
        //
    }

    getVersion(data?: boolean) {
        return (data) ? DATA_VERSION : VERSION;
    }

    goToRoute(path: string) {
        this.router.navigate(['/' + path]);
    }
}
