import { Component, OnInit, OnDestroy, Input, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import {
    BreadcrumbService,
    GeneService,
    DataService
} from '../../../core/services';

import { Gene } from '../../../models';

@Component({
    selector: 'gene-details-view',
    templateUrl: './gene-details-view.component.html',
    styleUrls: [ './gene-details-view.component.scss' ],
    encapsulation: ViewEncapsulation.None
})
export class GeneDetailsViewComponent implements OnInit {
    id: string;
    gene: Gene;
    geneInfo: Gene[];
    models: string[] = [];
    tissues: string[] = [];
    dataLoaded: boolean = false;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private breadcrumb: BreadcrumbService,
        private geneService: GeneService,
        private dataService: DataService
    ) { }

    ngOnInit() {
        // Get the current clicked gene
        this.gene = this.geneService.getCurrentGene();

        // Crumb logic after getting the current gene
        let crumbs = [
            { label: 'GENES', routerLink: ['/genes'] }
        ];

        this.id = this.route.snapshot.paramMap.get('id');
        // If we don't have a Gene here, in case we are reloading the page
        // try to get it from the server and move on
        if (!this.gene) {
            this.dataService.getGene(this.id).subscribe(data => {
                if (!data['item']) this.router.navigate(['/genes']);
                this.geneService.setCurrentGene(data['item']);
                this.geneService.setLogFC(data['minLogFC'], data['maxLogFC']);
                this.geneService.setNegAdjPValue(data['maxNegLogPValue']);
                this.gene = data['item'];
                crumbs.push({ label: this.gene.hgnc_symbol.toUpperCase(), routerLink: ['/gene-details/' + this.id] });
                this.breadcrumb.setCrumbs(crumbs);
                this.initDetails();
            });
        } else {
            crumbs.push({ label: this.gene.hgnc_symbol.toUpperCase(), routerLink: ['/gene-details/' + this.id] });
            this.breadcrumb.setCrumbs(crumbs);
            this.initDetails();
        }
    }

    initDetails() {
        this.dataService.loadGenes().then((loaded) => {
            if (loaded) {
                this.geneService.filterTissuesModels(this.gene).then((loaded: boolean) => {
                    this.dataLoaded = loaded;
                });
            }
            // Handle error later
        });
    }

    goToRoute(path: string, outlets?: any) {
        (outlets) ? this.router.navigate([path, outlets], {relativeTo: this.route}) : this.router.navigate([path], {relativeTo: this.route});
    }
}
